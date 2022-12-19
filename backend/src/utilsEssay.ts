import { getManager } from 'typeorm';
import { ConfigureCorrectionIa } from './entities/configure-correction/_base/configure-correction-ia.enum';
import Essay from './entities/essay/_base/essay.entity';
import MatrixAnnulmentReason from './entities/matrix-annulment-reason/_base/matrix-annulment-reason.entity';
import SkillItem from './entities/skill-item/_base/skill-item.entity';
import { findQuery, insertQuery, updateQuery } from './utilsFunctions';
import * as moment from 'moment';

export const saveLogIntegration = async (info) => {
  const linkEssayLog = process.env['NODE_SERVER_REDACAO_1000_SAVE_LOGS'];
  if (!linkEssayLog) return;

  const fs = require('fs');
  const logAutoSave = `
    "${new Date().toISOString()}" ${JSON.stringify({ info })}`;
  console.info({ logAutoSave });
  await fs.mkdir(linkEssayLog, { recursive: true }, () => {
    require('fs').appendFile(`${linkEssayLog}redacao1000.log`, logAutoSave, 'utf8', function (err) {
      console.log(err);
    });
  });
};

export const saveLog = async (essay: any, type, userId, deviceData = undefined) => {
  const linkEssayLog = process.env['NODE_SERVER_SAVE_ESSAY_LOGS'];
  if (!linkEssayLog) return;

  const fs = require('fs');
  const logAutoSave = `
    "${new Date().toISOString()}" ${type} -> (${userId})${JSON.stringify({
    deviceData,
    ...essay,
    typedImageBase64: type === 'END_______' ? essay['typedImageBase64'] : essay['typedImageBase64'] ? 'SIM' : 'NAO',
  })}`;
  console.info({ logAutoSave });
  await fs.mkdir(linkEssayLog, { recursive: true }, () => {
    require('fs').appendFile(`${linkEssayLog}${essay.id}.log`, logAutoSave, 'utf8', function (err) {
      console.log(err);
    });
  });
};

export const cancelEssay = async (matrixAnnulmentReasonId: number, essay: Essay, userLogged) => {
  const secondsTotal = Math.floor((new Date(essay.endTime).getTime() - new Date().getTime()) / 1000);
  saveLog({ id: essay.id, secondsTotal, ...essay }, 'AUTOCANCEL', userLogged['id']);

  const skillList: SkillItem[] = await findQuery('SkillItem', { points: 0 }, ['id']);

  skillList.map(async (v) => {
    await insertQuery('EssayResult', {
      dateFinal: new Date(),
      dateInitial: new Date(),
      delivered: false,
      isPreReview: false,
      reviewerId: 2922136,
      essayId: essay.id,
      skillItemId: v.id,
      skillItemFinalId: v.id,
      scoreFinal: 0,
      matrixAnnulmentReasonId,
      createdBy: 2922136 as any,
      lastModifiedBy: 2922136 as any,
      whiteLabel: userLogged['whiteLabel'],
    });
  });

  await updateQuery(
    'Essay',
    { id: essay.id },
    {
      reviewStartTime: new Date(),
      reviewEndTime: new Date(),
      commentsList: JSON.stringify([]),
    }
  );

  return {};
};

export const reviewItemEssay = async (essayId, orderSelected, skillId, reviewComment, configureCorrectionIa = ConfigureCorrectionIa.NAO, skillPreEval = [], scoreFinalBase = null, userId, whiteLabelId): Promise<any> => {
  const skillItem: Partial<SkillItem> = (await getManager().query(/* SQL*/ `SELECT x.id, x.points FROM SkillItem x WHERE (x.[order] = @0) AND (x.skillId = @1)`, [orderSelected ? orderSelected : 0, skillId])).pop();

  let skillItemFinal: Partial<SkillItem> = { ...skillItem };
  let scoreFinal = skillItem.points;
  if (configureCorrectionIa === ConfigureCorrectionIa.SECOND_CORRECTION && skillPreEval && skillPreEval.length > 0) {
    const preReview = skillPreEval.filter((x) => +x['skillId'] === +skillId).pop();
    let selectedFinal = orderSelected ? orderSelected : 0;

    selectedFinal = Math.floor((preReview.order + selectedFinal) / 2);
    scoreFinal = (preReview.points + skillItem.points) / 2;

    skillItemFinal = (await getManager().query(/* SQL*/ `SELECT x.id, x.points FROM SkillItem x WHERE (x.[order] = @0) AND (x.skillId = @1)`, [selectedFinal, skillId])).pop();
  }

  try {
    const result = {
      dateInitial: new Date(),
      dateFinal: new Date(),
      finalComment: reviewComment,
      delivered: false,
      isPreReview: false,
      reviewerId: userId,
      essayId,
      skillItemId: skillItem.id,
      skillItemFinalId: skillItemFinal.id,
      scoreFinal: scoreFinalBase !== null ? scoreFinalBase : scoreFinal,
      createdBy: userId,
      createdDate: new Date(),
      lastModifiedBy: userId,
      lastModifiedDate: new Date(),
      whiteLabel: whiteLabelId,
    } as any;

    await getManager().query(
      /* SQL*/ `INSERT INTO EssayResult 
                (${Object.keys(result).join(',')}) VALUES 
                (${Object.keys(result)
                  .map((v, i) => `@${i}`)
                  .join(',')});`,
      Object.values(result)
    );
  } catch (error) {
    console.info({ error });
  }
};
/** Integração Red1000 -> Enviar redações */
export const externalEssayReview = async () => {
  const REDACAO_1000_HOST = process.env.NODE_SERVER_REDACAO_1000_HOST;
  const REDACAO_1000_LOGIN = process.env.NODE_SERVER_REDACAO_1000_LOGIN;
  const REDACAO_1000_PASS = process.env.NODE_SERVER_REDACAO_1000_PASS;
  const REDACAO_1000_COUNT_SEND = process.env.NODE_SERVER_REDACAO_1000_COUNT_SEND;
  // const REDACAO_1000_TASKID = 90172
  // const REDACAO_1000_MODEL = 'ENEM_2020'
  const REVIEWER_ID = 2922136;

  const query = /* SQL*/ `
            SELECT  
                    t.id as themeId,
                    t.externalIntegrationId as themeExternalIntegrationId,
                    eer.externalId as essayExternalId,
                    eer.externalReviewId as essayExternalReviewId,
                    rev.cnt,	   						        
                    e.id,
                    e.endTime,
                    e.reOpenEndTime,
                    e.userId,
                    e.typedImage,
                    e.typedText,
                    e.whiteLabel
                FROM Essay e 
                LEFT JOIN EssayExternalReview eer on (e.id = eer.essayId AND eer.status != 'REOPEN')
                LEFT JOIN ConfigureApplication ca on ca.id = e.configureApplicationId
                LEFT JOIN Theme t on ca.themeId = t.id
                LEFT JOIN ( 
                    SELECT essayId, 1 as cnt FROM EssayResult WHERE isPreReview = 0 GROUP BY essayId
                ) rev on (e.id = rev.essayId)  
                WHERE                   
                    (e.endTime is not null or DATEADD(MINUTE, 30, e.reOpenEndTime) < GETDATE())
                AND (DATEADD(MINUTE, 30, e.endTime) < GETDATE() or DATEADD(MINUTE, 30, e.reOpenEndTime) < GETDATE()) 
                AND (t.externalIntegrationId is not null AND eer.externalId is null AND eer.externalReviewId is null) 
                AND rev.cnt is null 
        ORDER BY e.id 
        OFFSET 0 ROWS FETCH NEXT ${REDACAO_1000_COUNT_SEND} ROWS ONLY                        
    `;
  const essays = await getManager().query(query);
  saveLogIntegration({ type: 'SEND_QUERY  ', essays });

  const urlAuth = `${REDACAO_1000_HOST}/api/v2/parceiro/autenticacao`;
  const optionsAuth = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: REDACAO_1000_LOGIN, senha: REDACAO_1000_PASS }),
  };

  const replay = await fetch(urlAuth, optionsAuth);

  const replayJson = await replay.json();
  const jwtToken = replayJson['data']['jwtToken'];

  for (const key in essays) {
    const essayData = essays[key];
    let url = `${REDACAO_1000_HOST}/`;

    const essayExternalReview = await insertQuery('EssayExternalReview', {
      createdBy: 1,
      lastModifiedBy: 1,
      whiteLabel: 1,
      externalId: 0,
      externalReviewId: 0,
      essayId: essayData.id,
      status: 'START_SENDED',
    });

    const bodyStudent = {
      codigoEscolaParceiro: '1',
      codigoTurmaParceiro: '1',
      codigoAlunoParceiro: `${essayData.id}t${moment(essayData.endTime || essayData.reOpenEndTime).format('YYYYMMDDhhmm')}`,
      codigoMatricula: `M${essayData.id}t${moment(essayData.endTime || essayData.reOpenEndTime).format('YYYYMMDDhhmm')}`,
      nome: `Aluno${essayData.id}t${moment(essayData.endTime || essayData.reOpenEndTime).format('YYYYMMDDhhmm')}`,
      email: `aluno${essayData.id}t${moment(essayData.endTime || essayData.reOpenEndTime).format('YYYYMMDDhhmm')}@gmail.com`,
      gerarTokenAcesso: false,
      tarefaId: essayData.themeExternalIntegrationId,
    };
    const optionsStudent = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `RED1000 ${jwtToken}`,
      },
      body: JSON.stringify(bodyStudent),
    };
    const replayStudent = await fetch(`${REDACAO_1000_HOST}/api/v2/parceiro/aluno`, optionsStudent);
    const jsonStudent = await replayStudent.json();
    saveLogIntegration({
      type: 'SEND_STUDENT',
      options: optionsStudent,
      body: bodyStudent,
      replay: replayStudent,
      json: jsonStudent,
    });

    let body = {};
    if (essayData.typedImage) {
      url = url + `api/v2/parceiro/redacao/imagem/externa`;
      body = {
        urlImgRedacao: `https://${process.env.AWS_S3_BUCKET}.s3.us-west-2.amazonaws.com` + essayData.typedImage, // Arquivo da imagem da redação que será enviada para correção. Imagens suportadas: jpg, jpeg e png
        codigoAlunoParceiro: `${essayData.id}t${moment(essayData.endTime || essayData.reOpenEndTime).format('YYYYMMDDhhmm')}`, // Código de identificação do aluno no parceiro. Exemplo: 1234567890abcde
        tarefaId: essayData.themeExternalIntegrationId, // Código de identificação da tarefa. Se a redação pertencer a uma tarefa esse código deve ser informado.
        // idTema: REDACAO_1000_TASKID, // Código de identificação do tema no sistema Red1000. Ignorado se o atributo “tarefaId” for informado.
        // / modeloCorrecao: REDACAO_1000_MODEL, // Modelo que será utilizado na correção da redação. Ignorado se o atributo “tarefaId” for informado.
      };
    } else if (essayData.typedText && essayData?.typedText?.length >= 400) {
      url = url + `api/v2/parceiro/redacao/texto`;
      body = {
        corpo: essayData.typedText, // Texto da redação que será enviada para correção. O texto deve ter entre 200 e 2600 caracteres
        codigoAlunoParceiro: `${essayData.id}t${moment(essayData.endTime || essayData.reOpenEndTime).format('YYYYMMDDhhmm')}`, // Código de identificação do aluno no parceiro. Exemplo: 1234567890abcde
        tarefaId: essayData.themeExternalIntegrationId, // Código de identificação da tarefa. Se a redação pertencer a uma tarefa esse código deve ser informado.
        // idTema: REDACAO_1000_TASKID, // +essayData.themeExternalIntegrationId, // Código de identificação do tema no sistema Red1000. Ignorado se o atributo “tarefaId” for informado.
        // modeloCorrecao: REDACAO_1000_MODEL, // Modelo que será utilizado na correção da redação. Ignorado se o atributo “tarefaId” for informado.
      };
    } else {
      if ((essayData.typedText || '').length === 0 && !essayData.typedImage) {
        await cancelEssay(1, essayData, {
          id: REVIEWER_ID,
          whiteLabel: essayData['whiteLabel'],
        });
      } else if ((essayData.typedText || '').length < 400 && !essayData.typedImage) {
        await cancelEssay(2, essayData, {
          id: REVIEWER_ID,
          whiteLabel: essayData['whiteLabel'],
        });
      } else {
        await updateQuery(
          'EssayExternalReview',
          { id: essayExternalReview.id },
          {
            essayExternalReplay: JSON.stringify({
              error: 'Not sending integration',
              essayData,
            }),
            essayExternalSendData: new Date(),
            lastModifiedBy: REVIEWER_ID,
            externalId: '-1',
            externalReviewId: '-1',
            status: 'NOT_SENDED',
          }
        );

        await updateQuery(
          'Essay',
          { id: essayData.id },
          {
            reviewStartTime: new Date(),
            lastModifiedBy: REVIEWER_ID,
          }
        );
      }

      saveLogIntegration({ type: 'SEND_ESSAY  ', error: 'Not sending integration', essayData });
      saveLog({ id: +essayData.id, error: 'Not sending integration', essayData } as any, 'EXTE_SEND ', REVIEWER_ID);
      continue;
    }

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `RED1000 ${jwtToken}`,
      },
      body: JSON.stringify(body),
    };

    const replay = await fetch(url, options);
    const json = await replay.json();
    saveLogIntegration({ type: 'SEND_ESSAY  ', url, options, body, replay, json, essayData });

    saveLog({ id: +essayData.id, url, options, replay, json, essayData } as any, 'EXTE_SEND ', REVIEWER_ID);
    if (json['error'] !== 'Not Found') {
      await updateQuery(
        'EssayExternalReview',
        { id: essayExternalReview.id },
        {
          essayExternalReplay: JSON.stringify(json),
          essayExternalSendData: new Date(),
          lastModifiedBy: REVIEWER_ID,
          externalId: json?.data?.redacaoId || '-1',
          externalReviewId: json?.data?.correcaoRedacaoId || '-1',
          status: 'SENDED',
        }
      );

      await updateQuery(
        'Essay',
        { id: essayData.id },
        {
          reviewStartTime: new Date(),
          lastModifiedBy: REVIEWER_ID,
        }
      );
    }
  }

  return { status: 'ok' };
};

/** Integração Red1000 -> Ler resultados das redações enviadas */
export const externalEssayReviewCheck = async () => {
  const REDACAO_1000_HOST = process.env.NODE_SERVER_REDACAO_1000_HOST;
  const REDACAO_1000_LOGIN = process.env.NODE_SERVER_REDACAO_1000_LOGIN;
  const REDACAO_1000_PASS = process.env.NODE_SERVER_REDACAO_1000_PASS;
  const REDACAO_1000_COUNT_CHECK = process.env.NODE_SERVER_REDACAO_1000_COUNT_CHECK;
  const REVIEWER_ID = 2922136;

  const query = /* SQL*/ `
            SELECT  
                    t.id as themeId,
                    t.externalIntegrationId as themeExternalIntegrationId,
                    eer.externalId as externalId,
                    eer.externalReviewId as essayExternalReviewId,
                    eer.essayExternalSendData,
                    eer.essayExternalCheckData,
                   -- rev.id,	   						        
                    e.id,
                    e.userId,
                    e.typedImage,
                    e.typedText,
                    e.whiteLabel
                FROM Essay e 
                LEFT JOIN EssayExternalReview eer on (e.id = eer.essayId AND eer.status != 'REOPEN' AND eer.status != 'CANCEL')
                LEFT JOIN ConfigureApplication ca on ca.id = e.configureApplicationId
                LEFT JOIN Theme t on ca.themeId = t.id           
				LEFT JOIN EssayResult rev on (e.id = rev.essayId and isPreReview = 0)  
                WHERE 
                    (e.endTime is not null or e.reOpenEndTime < GETDATE())
                AND (t.externalIntegrationId is not null AND eer.externalId > 0 AND eer.externalReviewId  > 0)                     
                AND rev.id is null 
                AND (   -- Only search the after 5 hours
                        eer.essayExternalCheckData is null OR 
                        DATEDIFF(second, eer.essayExternalCheckData, GETDATE()) > (3600 * 5)
                    )
        ORDER BY eer.essayExternalCheckData, eer.essayExternalSendData
        OFFSET 0 ROWS FETCH NEXT ${REDACAO_1000_COUNT_CHECK} ROWS ONLY                        
    `;

  const essays = await getManager().query(query);

  saveLogIntegration({ type: 'CHECK_QUERY ', essays: essays.map((essay) => essay.id) });
  // console.info("CHECK_QUERY ", essays.map( essay => essay.id ))

  const urlAuth = `${REDACAO_1000_HOST}/api/v2/parceiro/autenticacao`;
  const optionsAuth = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: REDACAO_1000_LOGIN, senha: REDACAO_1000_PASS }),
  };

  const replay = await fetch(urlAuth, optionsAuth);

  const replayJson = await replay.json();
  const jwtToken = replayJson['data']['jwtToken'];

  for (const key in essays) {
    const essayData = essays[key];
    const whiteLabelId = essayData.whiteLabel;
    // const modeloCorrecao = 'modeloCorrecao'
    const url = `${REDACAO_1000_HOST}/api/v2/parceiro/redacao/laudo/${essayData.essayExternalReviewId}`;

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `RED1000 ${jwtToken}`,
      },
    };
    const replay = await fetch(url, options);
    const json = await replay.json();
    const data = json['data'];

    console.info(`${key}/${key}`, essayData.id, url, data?.situacao);

    saveLogIntegration({ type: 'CHECK_ESSAY ', url, options, replay, json });

    saveLog({ id: +essayData.id, url, options, replay, json } as any, 'EXTE_CHECK', REVIEWER_ID);

    if (data?.situacao === 'CORRIGIDA') {
      if (data?.codMotivoZero && data?.codMotivoZero > 0) {
        const matrixAnnulmentReason: Partial<MatrixAnnulmentReason> = (await getManager().query(/* SQL*/ `SELECT id FROM MatrixAnnulmentReason WHERE idRed1000 = @0`, [data.codMotivoZero])).pop();

        for (const pos in [0, 1, 2, 3, 4]) {
          const skillId = +pos + 1;
          const skillItem: Partial<SkillItem> = (await getManager().query(/* SQL*/ `SELECT x.id, x.points FROM SkillItem x WHERE (x.[order] = @0) AND (x.skillId = @1)`, [0, +skillId])).pop();

          const result = {
            dateInitial: new Date(),
            dateFinal: new Date(),
            delivered: false,
            isPreReview: false,
            reviewerId: REVIEWER_ID,
            essayId: essayData.id,
            skillItemId: skillItem.id,
            skillItemFinalId: skillItem.id,
            matrixAnnulmentReasonId: matrixAnnulmentReason.id || null,
            scoreFinal: 0,
            createdBy: REVIEWER_ID,
            createdDate: new Date(),
            lastModifiedBy: REVIEWER_ID,
            lastModifiedDate: new Date(),
            whiteLabel: whiteLabelId,
          } as any;

          await getManager().query(
            /* SQL*/ `INSERT INTO EssayResult 
                            (${Object.keys(result).join(',')}) VALUES 
                            (${Object.keys(result)
                              .map((v, i) => `@${i}`)
                              .join(',')});`,
            Object.values(result)
          );
        }
      } else {
        for (const pos in data.eixos) {
          const eixo = data.eixos[pos];
          const skillId = eixo.ordem;

          await reviewItemEssay(
            essayData.id, // essayId
            Math.floor(eixo['nota'] / 40), // orderSelected
            skillId, // skillId
            '',
            ConfigureCorrectionIa.NAO,
            [],
            eixo['nota'], // scoreFinalBase
            REVIEWER_ID,
            whiteLabelId
          );
        }
      }

      await updateQuery(
        'EssayExternalReview',
        { essayId: essayData.id, status: 'SENDED' },
        {
          essayExternalReplay: JSON.stringify(json),
          essayExternalCheckData: new Date(),
          lastModifiedBy: REVIEWER_ID,
          status: 'RECEIVED',
        }
      );

      await updateQuery(
        'Essay',
        { id: essayData.id },
        {
          reviewEndTime: new Date(),
          reviewUserId: REVIEWER_ID,
          lastModifiedBy: REVIEWER_ID,
        }
      );
    } else {
      await updateQuery(
        'EssayExternalReview',
        { essayId: essayData.id, status: 'SENDED' },
        {
          essayExternalReplay: JSON.stringify(json),
          essayExternalCheckData: new Date(),
          lastModifiedBy: REVIEWER_ID,
        }
      );
    }
  }

  return { status: 'ok' };
};
