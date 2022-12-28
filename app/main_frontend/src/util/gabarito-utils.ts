import {
  FOLDER_UPLOAD_CARDS,
  URL_CHECK_GABARITO_TEMPLATE,
  URL_CREATE_PDF_TEMPLATE,
} from './constants';
import {
  createBreadcrumbEnemFit,
  createBreadcrumbExam,
  getLoggedUser,
  getPlataformModule,
  getPlataformName,
  selectSystemEvaluation,
} from './entity-utils';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { IStudentColumns } from '../../components copy/visuals/form-card-print';

export const generatePDFCardStudentsBlank = () => {
  const json = [
    {
      student_code_qr: '',
      inscription_number: '',
      gabarito_tp: 'A',
      respostas: '',
      dados_usuarios: {
        number: '',
        name: '',
        unit: '',
        disciplina: 'disciplina',
        periodo: 'período',
        descricao: 'descricao',
        descricao2: '&nbsp;',
        sala: '',
        curso: '',
        filtro_1: '',
        custom_1: '',
      },
      dados_usuarios_data: {
        birthday_d1: false,
        birthday_d2: false,
        birthday_m1: false,
        birthday_m2: false,
        birthday_y1: false,
        birthday_y2: false,
        birthday_y3: false,
        birthday_y4: false,
      },
      inscription_number_table: {
        number_1: false,
        number_2: false,
        number_3: false,
        number_4: false,
        number_5: false,
        number_6: false,
        number_7: false,
        number_8: false,
        number_9: false,
        number_10: false,
      },
    },
  ];

  return JSON.stringify(json);
};

export const generatePDFCardStudents = (
  data?: IStudentColumns[],
  exam?: any
) => {
  const module = getPlataformModule();
  const plataformName = getPlataformName() + '<br>';

  const headerInfo = (student: any) => {
    const systemEvaluation = selectSystemEvaluation();
    let moduleTxt = plataformName;

    if (module !== 'enemfit')
      moduleTxt +=
        student.disciplineSigla +
        ' - ' +
        student.teacherName +
        ' (' +
        systemEvaluation +
        ')<br>';

    return moduleTxt;
  };

  const json = data.map((student, j) => ({
    student_code_qr: student.ra,
    inscription_number: student.ra,
    gabarito_tp: '',
    respostas: '',
    dados_usuarios: {
      number: student.ra,
      name: student.fullname,
      unit: student.cerneSchoolName,
      turma: headerInfo(student) + student.cerneClassName,
      re: 'RE: ' + student.re,
      ra:
        'RA: ' +
        (exam.descriptionExam
          ? student.ra + ' / ' + exam.descriptionExam
          : student.ra),
    },
    dia_texto: {
      day: exam.dayApplication,
    },
    dados_usuarios_data: {
      birthday_d1: '',
      birthday_d2: '',
      birthday_m1: '',
      birthday_m2: '',
      birthday_y1: '',
      birthday_y2: '',
      birthday_y3: '',
      birthday_y4: '',
    },
    inscription_number_table: {
      number_1: '',
      number_2: '',
      number_3: '',
      number_4: '',
      number_5: '',
      number_6: '',
      number_7: '',
      number_8: '',
      number_9: '',
      number_10: '',
    },
  }));
  //console.log(json);
  /* 
        const json = {
            '0': {
    
                student_code_qr: '9865270125',
                inscription_number: '9865270125',
                gabarito_tp: '',
                respostas: '',
                dados_usuarios: {
                    number: '9865270125',
                    name: 'Aluno de Teste',
                    unit: 'Unit Test 01',
                    re: '',
                    ra: '',
                },
                dados_usuarios_data: {
                    birthday_d1: 1,
                    birthday_d2: 3,
                    birthday_m1: 0,
                    birthday_m2: 8,
                    birthday_y1: 1,
                    birthday_y2: 9,
                    birthday_y3: 9,
                    birthday_y4: 0,
                },
                inscription_number_table: {
                    number_1: 9,
                    number_2: 8,
                    number_3: 6,
                    number_4: 5,
                    number_5: 2,
                    number_6: 7,
                    number_7: 0,
                    number_8: 1,
                    number_9: 2,
                    number_10: 5,
                },
            }
        };
        */
  return JSON.stringify(json);
};

export const generatePDFCard = async (
  template: Object | string,
  studentsData: Object | string,
  onSuccess: Function
) => {
  let formData = new FormData();

  formData.append(
    'template',
    typeof template === 'string' ? template : JSON.stringify(template)
  );
  formData.append(
    'students',
    typeof studentsData === 'string'
      ? studentsData
      : JSON.stringify(studentsData)
  );

  await fetch(URL_CREATE_PDF_TEMPLATE, {
    method: 'post',
    body: formData,
  }).then(async (v) => {
    onSuccess(await v.text());
  });
};

export const reviewCard = async (
  folder: number,
  template: Object | string,
  imageList: File[],
  onSuccess: Function
) => {
  const userLogged = getLoggedUser();

  if (imageList.length < 0) {
    alert('Selecione a imagem do cartão !!!');
    return false;
  }

  var formData = new FormData();
  formData.append('file', imageList[0]);
  formData.append(
    'gabarito-template',
    typeof template === 'string' ? template : JSON.stringify(template)
  );

  console.info({ formData, imageList });

  const chaveCartao = 'MGR@CARTAO';
  const codigoSistema = FOLDER_UPLOAD_CARDS;
  const codigoRede = '4'; //38 ou 39
  const codigoEmpresa = userLogged.whiteLabel;
  const codigoProva = folder;

  let chave =
    chaveCartao +
    '-' +
    codigoSistema +
    '-' +
    codigoRede +
    '-' +
    codigoEmpresa +
    '-' +
    codigoProva;

  chave = base64_encode(chave);

  try {
    //fetch(`${URL_CHECK_GABARITO_TEMPLATE}?nome_gabarito=${chave}=&q=10&teste=1`, {
    const v = await fetch(
      `${URL_CHECK_GABARITO_TEMPLATE}?nome_gabarito=${chave}=&q=`,
      {
        method: 'post',
        body: formData,
      }
    );

    const json = await v.json();
    await onSuccess(json);
  } catch (e) {
    await onSuccess({ error: 'Erro' });
  }

  /*


        $.ajax({
            url: ,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(json){

                var leitura = $.parseJSON(json);

                $('#CARTAOLEITURA').html("<img style='width:100%; height:auto' src='" + leitura['img_scanned'] + "' />");

                $('#CARTAOLEITURAJSON').html("<div id='editorTemplateResposta' style='height: 300px;'></div>");

                var templateRespostaEditor = new JSONEditor(document.getElementById("editorTemplateResposta"), options);
                templateRespostaEditor.set(leitura);
            },
            error: function () {
                alert('N�o poss�vel gravar o Registro !!!');
            }
        });
        */

  return true;
};

export const contrastImage = (imageData, contrast) => {
  // contrast input as percent; range [-1..1]
  var data = imageData.data; // Note: original dataset modified directly!
  contrast *= 255;
  var factor = (contrast + 255) / (255.01 - contrast); //add .1 to avoid /0 error.

  for (var i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i + 1] = factor * (data[i + 1] - 128) + 128;
    data[i + 2] = factor * (data[i + 2] - 128) + 128;
  }
  return imageData; //optional (e.g. for filter function chaining)
};
export const dataURLtoBlob = (dataURL) => {
  let array, binary, i, len;
  binary = atob(dataURL.split(',')[1]);
  array = [];
  i = 0;
  len = binary.length;
  while (i < len) {
    array.push(binary.charCodeAt(i));
    i++;
  }
  return new Blob([new Uint8Array(array)], {
    type: 'image/jpeg',
  });
};

export const alternativeCode = (code: string) => {
  const alt = {
    A: '<span style="font-size:18px">🅐</span>',
    B: '<span style="font-size:18px">🅑</span>',
    C: '<span style="font-size:18px">🅒</span>',
    D: '<span style="font-size:18px">🅓</span>',
    E: '<span style="font-size:18px">🅔</span>',
  };

  return alt[code];
};
export const getAlternativeLetter = (code: number) => {
  const alt = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
  };

  return alt[code] ?? code + '';
};

export const getAlternativeCode = (code: number) => {
  const alt = {
    1: '&#127312;',
    2: '&#127313;',
    3: '&#127314;',
    4: '&#127315;',
    5: '&#127316;',
  };

  return alt[code] ?? code + '';
};
