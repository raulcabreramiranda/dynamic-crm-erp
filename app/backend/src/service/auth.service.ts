import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import { AdminAuthority as Authority } from '../entities/admin-authority/_base/admin-authority.entity';
import { AdminUser as User } from '../entities/admin-user/_base/admin-user.entity';
import { AdminAuthorityRepository as AuthorityRepository } from '../entities/admin-authority/admin-authority.repository';
import { AdminPermissionProfileRepository as PermissionProfileRepository } from '../entities/admin-permission-profile/admin-permission-profile.repository';
import { AdminPermissionUserRepository as PermissionUserRepository } from '../entities/admin-permission-user/admin-permission-user.repository';
import { UserService } from './user.service';
import { CerneDegreeRepository } from '../entities/cerne-degree/cerne-degree.repository';
import { JorneyRepository } from '../entities/jorney/jorney.repository';

import { getManager } from 'typeorm';
import * as moment from 'moment';
import { externalEssayReview, externalEssayReviewCheck } from '../utilsEssay';
import { UserType } from 'src/entities/cerne-plataform-user/_base/user-type.enum';

type PlataformUserData = {
  classId: number;
  className: string;
  plataformId: number;
  disciplineId: number;
  degreeId: number;
  userType: UserType;
};
@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthorityRepository)
    private authorityRepository: AuthorityRepository,
    @InjectRepository(PermissionUserRepository)
    private permissionUserRepository: PermissionUserRepository,
    @InjectRepository(PermissionProfileRepository)
    private permissionProfileRepository: PermissionProfileRepository,
    @InjectRepository(CerneDegreeRepository)
    private cerneDegreeRepository: CerneDegreeRepository,
    @InjectRepository(JorneyRepository)
    private jorneyRepository: JorneyRepository,
    private userService: UserService
  ) {}

  async changePlataformLink(module, user): Promise<any> {
    const entityManager = getManager();
    const plataformData = (await entityManager.query(`SELECT * FROM CernePlataform WHERE id=@0`, [module])).pop();

    const url = plataformData.api;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        token: plataformData.token,
        userID: user.id,
        assessmentModel: plataformData.assessmentModelId,
        schoolId: user.whiteLabel,
        clientId: user.clientId || 4,
      }),
    };
    console.info({ url, options });
    const replay = await fetch(url, options);
    const json = await replay.json();
    console.info({ replay, json });

    return json;
  }

  async changeToEstimateGradesEnemFitLink(masterId, degreeId, whiteLabel, user): Promise<any> {
    const t = await getManager().query(
      /* SQL*/ `
                                        SELECT 	
                                            -- em.masterId, eca.examId, e.cerneDegreeId, e.whiteLabel,
                                            max(COALESCE(eca.scheduleReleaseResults, '2500-01-01 00:00:00')) as scheduleReleaseResults                                            
                                        FROM ExamsMaster em 
                                        LEFT JOIN Exam e on e.id = em.examId
                                        LEFT JOIN ExamConfigureApplication eca on e.id = eca.examId
                                        LEFT JOIN CerneClass cc on (cc.id = eca.cerneClassId and cc.whiteLabel = e.whiteLabel)
                                        LEFT JOIN CernePlataformUser cpu on (cpu.classId = cc.id)
                                        WHERE em.masterId = @0 and e.cerneDegreeId = @1 and e.whiteLabel = @2 and cpu.[year] = 2022 and cpu.plataformId = 2   
                                    `,
      [masterId, degreeId, whiteLabel]
    );

    if (!t[0].scheduleReleaseResults || moment(t[0].scheduleReleaseResults).format('YYYY-MM-DD HH:mm:ss') === moment('2500-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')) {
      return { error: 'Existem turmas sem data de "Liberação de notas" configurada.' };
    } else if (moment(t[0].scheduleReleaseResults) > moment()) {
      return {
        error: `Notas não disponíveis. A data de liberação das notas é: ${moment(t[0].scheduleReleaseResults).format('DD/MM/YYYY HH:mm')}`,
      };
    }

    const url = process.env.NODE_SERVER_CLIENT_ESTIMATE_GRADES;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        centralizadorUserId: user.id,
        schoolId: whiteLabel,
        masterId,
        degreeId,
        token: 'CB6A8856-8973-4E6B-A247-838BE5B22C91',
      }),
    };

    console.info('changeToEstimateGradesLink', { url, options });
    const replay = await fetch(url, options);
    const json = await replay.json();
    console.info({ replay, json });

    return json;
  }

  async changeToEstimateGradesExamLink(examId, degreeId, whiteLabel, user): Promise<any> {
    const t = await getManager().query(
      /* SQL*/ `
                SELECT 	
                    max(COALESCE(eca.scheduleReleaseResults, '2500-01-01 00:00:00')) as scheduleReleaseResults                                            
                FROM Exam e
                LEFT JOIN ExamConfigureApplication eca on e.id = eca.examId
                WHERE e.id = @0 and e.whiteLabel = @1
            `,
      [examId, whiteLabel]
    );

    if (t.length === 0 || !t[0].scheduleReleaseResults || moment(t[0].scheduleReleaseResults).format('YYYY-MM-DD HH:mm:ss') === moment('2500-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')) {
      return { error: 'Tem turmas sem configurar a data de liberação de Notas', type_error: 1 };
    } else if (moment(t[0].scheduleReleaseResults) > moment()) {
      return {
        error: `Notas não disponíveis. A data de liberação das notas é: ${moment(t[0].scheduleReleaseResults).format('DD/MM/YYYY HH:mm')}`,
      };
    }

    let _degreeId = degreeId;
    if (+degreeId == -1) {
      const result = await getManager().query(/* SQL*/ `SELECT cerneDegreeId FROM Exam WHERE id = @0`, [examId]);
      _degreeId = result?.[0]?.['cerneDegreeId'];
    }

    const url = process.env.NODE_SERVER_CLIENT_ESTIMATE_GRADES;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        centralizadorUserId: user.id,
        schoolId: whiteLabel,
        masterId: examId,
        degreeId: _degreeId,
        token: 'CB6A8856-8973-4E6B-A247-838BE5B22C91',
      }),
    };

    console.info('changeToEstimateGradesLink', { url, options });
    const replay = await fetch(url, options);
    console.info('changeToEstimateGradesLinkReplay', replay);
    const json = await replay.json();
    console.info({ json });

    return json;
  }

  async changeSchoolLink(module, whiteLabel, user): Promise<any> {
    const entityManager = getManager();
    const plataformData = (await entityManager.query(`SELECT * FROM CernePlataform WHERE id=@0`, [module])).pop();

    const url = plataformData.api;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        token: plataformData.token,
        userID: user.id,
        assessmentModel: plataformData.assessmentModelId,
        schoolId: whiteLabel,
        clientId: user.clientId || 4,
      }),
    };
    console.info({ url, options });
    const replay = await fetch(url, options);
    const json = await replay.json();
    console.info({ replay, json });

    return json;
  }

  /**
   * Cria um link de login de uso único para acessar a um dos modulos
   * @param body
   * @param module
   * @returns
   */
  async createLoginLink(body, module): Promise<any> {
    console.info('createLoginLink', body);
    const user = (
      await getManager().query(
        /* SQL*/ `
            SELECT id, [login], clientId FROM AdminUser WHERE id = @0 AND whiteLabel = @1 ORDER BY id ASC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY
        `,
        [body.userID, body.schoolId]
      )
    ).pop();

    if (body.token !== process.env.NODE_SERVER_SSO_TOKEN) {
      return { ResultAccessUrl: [`Token invalido`], success: false };
    }

    const token = this.jwtService.sign({
      token: body.token,
      userID: body.userID,
      userLogin: user.login,
      whiteLabel: body.schoolId,
      clientId: user.clientId || 4,
      module,
    });

    let clientUrl = process.env.NODE_SERVER_CLIENT_URL;

    if (module === 'redacao' && process.env.NODE_SERVER_CLIENT_URL_REDACAO) {
      if (+user.clientId === 38) {
        clientUrl = process.env.NODE_SERVER_CLIENT_38_URL_REDACAO;
      } else if (+user.clientId === 39) {
        clientUrl = process.env.NODE_SERVER_CLIENT_39_URL_REDACAO;
      } else {
        clientUrl = process.env.NODE_SERVER_CLIENT_URL_REDACAO;
      }
    }
    if (module === 'provas' && process.env.NODE_SERVER_CLIENT_URL_PROVAS) {
      if (+user.clientId === 38) {
        clientUrl = process.env.NODE_SERVER_CLIENT_38_URL_PROVAS;
      } else if (+user.clientId === 39) {
        clientUrl = process.env.NODE_SERVER_CLIENT_39_URL_PROVAS;
      } else {
        clientUrl = process.env.NODE_SERVER_CLIENT_URL_PROVAS;
      }
    }
    if (module === 'enemfit' && process.env.NODE_SERVER_CLIENT_URL_ENEMFIT) {
      if (+user.clientId === 38) {
        clientUrl = process.env.NODE_SERVER_CLIENT_38_URL_ENEMFIT;
      } else if (+user.clientId === 39) {
        clientUrl = process.env.NODE_SERVER_CLIENT_39_URL_ENEMFIT;
      } else {
        clientUrl = process.env.NODE_SERVER_CLIENT_URL_ENEMFIT;
      }
    }
    // clientUrl = 'http://localhost:3000/'
    return { ResultAccessUrl: [`${clientUrl}${module}/login-token?token=${token}`], success: true };
  }

  async loginToken(body): Promise<any> {
    const decode = this.jwtService.decode(body.token);
    const userMasterPassword = process.env.NODE_SERVER_USER_MASTER_PASSWORD;

    return await this.login({
      module: decode['module'],
      username: decode['userID'] || decode['userId'],
      whiteLabel: decode['whiteLabel'],
      password: userMasterPassword,
    } as UserLoginDTO);
  }

  async login(userLogin: UserLoginDTO): Promise<any> {
    console.info({ userLogin });
    const loginUserName: any = isNaN(+userLogin['username']) ? userLogin.username?.trim() : userLogin.username;
    const loginPassword = userLogin.password;
    const loginUserWhiteLabel = userLogin.whiteLabel;
    //  const clientId = userLogin.clientId;
    let module = 3;

    if (userLogin.module === 'redacao') {
      module = 3;
    }
    if (userLogin.module === 'provas') {
      module = 5;
    }
    if (userLogin.module === 'enemfit') {
      module = 2;
    }

    const userMasterPassword = process.env.NODE_SERVER_USER_MASTER_PASSWORD;
    if (loginPassword !== userMasterPassword) {
      console.error('Erro 1 de autenticação!. Por favor verifique suas credenciais e tente novamente.');
      console.info({ userMasterPassword, loginPassword });
      throw new HttpException('<strong>Erro de autenticação!</strong><br>Por favor verifique suas credenciais e tente novamente.', HttpStatus.BAD_REQUEST);
    }

    const whereUser: any[] = [loginUserName];
    if (loginUserWhiteLabel) {
      whereUser.push(loginUserWhiteLabel);
    }

    const entityManager = getManager();
    const user = (
      await entityManager.query(
        /* SQL*/ `
            SELECT * FROM AdminUser WHERE 
                ${isNaN(loginUserName) ? `[login] = @0` : `id = @0`} 
                ${loginUserWhiteLabel ? `AND whiteLabel = @1` : ``} 
            ORDER BY id ASC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY
        `,
        whereUser
      )
    ).pop();

    if (!user) {
      console.error('Erro 2 de autenticação!. Por favor verifique suas credenciais e tente novamente.');
      console.info({ userLogin });
      throw new HttpException('<strong>Erro de autenticação!</strong><br>Por favor verifique suas credenciais e tente novamente.', HttpStatus.BAD_REQUEST);
    }

    if (!user.activated) {
      console.error('Erro 3 de autenticação!. O Usuario não esta ativado.');
      console.info({ userLogin, user });
      throw new HttpException('<strong>Erro de autenticação!</strong><br>O Usuario não esta ativado.', HttpStatus.FORBIDDEN);
    }

    const permissions = [];
    const hasAnyPermission = true;
    const authorities = ['ROLE_ADMIN'];

    const cernePlataformUser = await entityManager.query(/* SQL*/ `
            SELECT DISTINCT
                    C.id as classId,
                    C.name className,
                    A.platformId as plataformId,		
                    AD.disciplineId, 
                    C.degreeId,
                    CASE
                        WHEN U.roleId = 1 THEN 'STUDENT'
                        WHEN U.roleId = 2 THEN 'COORDINATOR'
                        WHEN U.roleId = 3 THEN 'TEACHER'
                        WHEN U.roleId = 4 THEN 'REVIEWER'
                        ELSE 'ADMIN'
                    END as userType
                FROM Centralizador.dbo.Accesses A
                INNER JOIN  Centralizador.dbo.Users U ON U.id = A.userId
                INNER JOIN  Centralizador.dbo.User_Schools US ON US.userId =  U.id  AND  a.schoolId  = US.schoolId 
                left join  Centralizador.dbo.Accesses_Disciplines AD ON AD.accessId = a.id
                left join  Centralizador.dbo.Classes C ON  C.id = ISNULL(US.classId, AD.classId)
                WHERE a.userId = ${+user.id}  AND A.platformId = ${+module};
        `);

    let cerneClass = null;
    const cernePlataform = {};
    cernePlataformUser.forEach((plataformUser: PlataformUserData) => {
      if (cerneClass === null && plataformUser.classId) {
        cerneClass = { id: +plataformUser.classId, name: plataformUser.className };
      }
      if (!cernePlataform[plataformUser.plataformId]) {
        cernePlataform[plataformUser.plataformId] = {};
      }
      if (!cernePlataform[plataformUser.plataformId][plataformUser.disciplineId || 0]) {
        cernePlataform[plataformUser.plataformId][plataformUser.disciplineId || 0] = {};
      }
      if (!cernePlataform[plataformUser.plataformId][plataformUser.disciplineId || 0][plataformUser.degreeId || 0]) {
        cernePlataform[plataformUser.plataformId][plataformUser.disciplineId || 0][plataformUser.degreeId || 0] = [];
      }
      cernePlataform[plataformUser.plataformId][plataformUser.disciplineId || 0][plataformUser.degreeId || 0].push({
        classId: plataformUser.classId || 0,
        userType: plataformUser.userType,
      });
    });

    const cerneSchoolData = (
      await entityManager.query(/* SQL*/ `
            SELECT 
                name, systemEvaluation, deliveryProof, printingProof, uploadReplyCard, imageContentType, 
                correctionEssayQuestions, releaseResults, [image], [date] 
            FROM CerneSchool WHERE whiteLabel=${+user.whiteLabel}
        `)
    ).pop();

    const whiteLabelData = await entityManager.query(
      /* SQL*/ `
            SELECT u.whiteLabel as id, s.name 
            FROM AdminUser u 
            LEFT JOIN CerneSchool s on u.whiteLabel = s.id 
            WHERE u.id = @0
        `,
      [+user.id]
    );

    const clientData = await entityManager.query(
      /* SQL*/ `
            SELECT 
            [domain], 
            clientName as 'name', 
            clientPrimaryColor as 'primaryColor', 
            clientSecondaryColor as 'secondaryColor', 
            clientImage as 'image', 
            clientImageHeader as 'imageHeader', 
            clientImageFooter as 'imageFooter'
            FROM CernePlataform p WHERE p.clientId = @0 ORDER BY p.id
        `,
      [user.clientId || 4]
    );

    const userResponse = {
      id: +user.id,
      login: user.login,
      whiteLabelData,
      clientData: clientData[0] || {},
      fullname: user.fullname,
      whiteLabel: +user.whiteLabel,
      clientId: +user.clientId || 4,
      userType: user.userType,
      activated: user.activated,
      email: user.email,
      langKey: user.langKey,
      authorities,
      hasAnyPermission,
      permissions,
      cerneSchool: cerneSchoolData,
      cerneClass,
      cernePlataformUser: cernePlataform,
    };

    const payload: Payload = {
      id: +user.id,
      username: user.login,
      whiteLabel: loginUserWhiteLabel || whiteLabelData[0]['id'],
      clientId: user.clientId || 4,
      userType: user.userType,
      authorities: ['ROLE_ADMIN'],
    };

    /* eslint-disable */
    return {
      id_token: this.jwtService.sign(payload),
      user: userResponse,
    };
  }

  /* eslint-enable */
  async validateUser(payload: Payload): Promise<User | undefined> {
    return await this.findUserWithAuthById(payload.id, payload.whiteLabel);
  }

  async find(): Promise<Authority[]> {
    return await this.authorityRepository.find();
  }

  async findUserWithAuthById(userId: number, whiteLabelId?: number): Promise<User | undefined> {
    const filters = { id: userId };
    if (whiteLabelId) {
      filters['whiteLabel'] = whiteLabelId;
    }
    const user: any = await this.userService.findByfields({
      relations: ['cerneClass'],
      where: filters,
    });
    await this.permissionUserRepository.find({
      where: { adminUser: {id: userId} },
      relations: ['adminPermission'],
    });

    return {
      ...user,
      permissions: {},
      hasAnyPermission: true,
      authorities: ['ROLE_ADMIN'],
    };
  }

  async externalReview(): Promise<any> {
    return externalEssayReview();
  }

  async externalReviewCheck(): Promise<any> {
    return externalEssayReviewCheck();
  }
}
