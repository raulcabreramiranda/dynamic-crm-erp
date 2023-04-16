import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import AdminAuthority, {
  AdminAuthority as Authority,
} from '../entities/admin-authority/_base/admin-authority.entity';
import { AdminUser as User } from '../entities/admin-user/_base/admin-user.entity';
import { UserService } from './user.service';

import { getManager, Repository } from 'typeorm';
import * as moment from 'moment';
import AdminPermissionUser from 'src/entities/admin-permission-user/_base/admin-permission-user.entity';
import { IAdminUserRepository } from 'src/entities/admin-user/admin-user.providers';
import cryptoMd5 from 'src/security/cryptoMd5';

type PlataformUserData = {
  classId: number;
  className: string;
  plataformId: number;
  disciplineId: number;
  degreeId: number;
  userType: any;
};
@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    @Inject('ADMINAUTHORITY_REPOSITORY')
    protected authorityRepository: Repository<AdminAuthority>,
    @Inject('ADMINPERMISSIONUSER_REPOSITORY')
    protected permissionUserRepository: Repository<AdminPermissionUser>,
    @Inject('ADMINUSER_REPOSITORY')
    protected adminUserRepository: IAdminUserRepository,

    private userService: UserService,
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    console.info({ userLogin });
    const loginUserName: any = isNaN(+userLogin['username'])
      ? userLogin.username?.trim()
      : userLogin.username;
    const loginPassword = userLogin.password;
    const md5 = cryptoMd5(loginPassword);

    const selectColumns = [
      'id',
      'activated',
      'login',
      'fullname',
      'email',
      'adminProfile.name',
      'adminProfile.adminPermissionProfiles.id',
      'adminProfile.adminPermissionProfiles.adminPermission.session',
      'adminProfile.adminPermissionProfiles.adminPermission.method',
    ];
    const filters = {
      login: { value: loginUserName, operation: 'equals' },
      password: { value: md5, operation: 'equals' },
    };

    const user = await this.adminUserRepository.getOne({
      filters,
      selectColumns,
    });

    console.info({ user });

    const payload: any = {
      id: 2869375,
      username: 'coordjor@jornada.com',
      whiteLabel: '297658',
      clientId: 4,
      userType: 'COORDINATOR',
      authorities: ['ROLE_ADMIN'],
    };

    if (!user) {
      console.error(
        'Erro 2 de autenticação!. Por favor verifique suas credenciais e tente novamente.',
      );
      console.info({ userLogin, payload });
      throw new HttpException(
        '<strong>Erro de autenticação!</strong><br>Por favor verifique suas credenciais e tente novamente.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.activated) {
      console.error('Erro 3 de autenticação!. O Usuario não esta ativado.');
      console.info({ userLogin, user });
      throw new HttpException(
        '<strong>Erro de autenticação!</strong><br>O Usuario não esta ativado.',
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      id_token: this.jwtService.sign(payload),
      user: user,
    };

    /*
    const permissions = [];
    const hasAnyPermission = true;
    const authorities = ['ROLE_ADMIN'];

    const cernePlataformUser = await entityManager.query(`
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
      await entityManager.query(/ * SQL* / `
            SELECT 
                name, systemEvaluation, deliveryProof, printingProof, uploadReplyCard, imageContentType, 
                correctionEssayQuestions, releaseResults, [image], [date] 
            FROM CerneSchool WHERE whiteLabel=${+user.whiteLabel}
        `)
    ).pop();

    const whiteLabelData = await entityManager.query(
      / * SQL* / `
            SELECT u.whiteLabel as id, s.name 
            FROM AdminUser u 
            LEFT JOIN CerneSchool s on u.whiteLabel = s.id 
            WHERE u.id = @0
        `,
      [+user.id]
    );

    const clientData = await entityManager.query(
      / * SQL* / `
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
  }

  /* eslint-enable */
  async validateUser(payload: Payload): Promise<User | undefined> {
    return await this.findUserWithAuthById(payload.id, payload.whiteLabel);
  }

  async find(): Promise<Authority[]> {
    return await this.authorityRepository.find();
  }

  async findUserWithAuthById(
    userId: number,
    whiteLabelId?: number,
  ): Promise<User | undefined> {
    const filters = { id: userId };
    if (whiteLabelId) {
      filters['whiteLabel'] = whiteLabelId;
    }
    const user: any = await this.userService.findByfields({
      relations: ['cerneClass'],
      where: filters,
    });
    await this.permissionUserRepository.find({
      where: { adminUser: { id: userId } },
      relations: ['adminPermission'],
    });

    return {
      ...user,
      permissions: {},
      hasAnyPermission: true,
      authorities: ['ROLE_ADMIN'],
    };
  }
}
