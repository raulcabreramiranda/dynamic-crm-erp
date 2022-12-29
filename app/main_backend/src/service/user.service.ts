import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AdminUser, { AdminUser as User } from '../entities/admin-user/_base/admin-user.entity';
import { UserRepository } from '../repository/user.repository';
import { FindManyOptions, FindOneOptions, getManager, Repository } from 'typeorm';

import { getMany } from 'src/utilsFunctions';
import AdminAuditEntity from 'src/entities/admin-audit-entity/_base/admin-audit-entity.entity';
import AdminPermissionProfile from 'src/entities/admin-permission-profile/_base/admin-permission-profile.entity';
import AdminProfile from 'src/entities/admin-profile/_base/admin-profile.entity';
import AdminPermissionUser from 'src/entities/admin-permission-user/_base/admin-permission-user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('ADMINUSER_REPOSITORY') protected userRepository: Repository<AdminUser>,
    @Inject('ADMINAUDITENTITY_REPOSITORY') protected auditEntityRepository: Repository<AdminAuditEntity>,
    @Inject('ADMINPERMISSIONPROFILE_REPOSITORY') protected permissionProfileRepository: Repository<AdminPermissionProfile>,
    @Inject('ADMINPROFILE_REPOSITORY') protected profileRepository: Repository<AdminProfile>,
    @Inject('ADMINPERMISSIONUSER_REPOSITORY') protected permissionUserRepository: Repository<AdminPermissionUser>,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    const result = await this.userRepository.findOne({where:{id: +id}});
    return this.flatAuthorities(result);
  }

  async findByfields(options: FindOneOptions<User>, filters = []): Promise<User | undefined> {
    options.relations = ['cerneClass', 'cernePlataformUser'];

    const result = await getMany(
      options,
      filters,
      User,
      null,
      JSON.stringify({
        id: '',
        login: '',
        fullname: '',
        whiteLabel: '',
        userType: '',
        activated: '',
        clientId: '',
        email: '',
        langKey: '',
        cerneClass: { id: '', name: '' },
        cernePlataformUser: {
          year: '',
          plataform: { id: '' },
          class: { id: '' },
          degree: { id: '' },
          discipline: { id: '' },
          userType: '',
          whiteLabel: '',
        },
      })
    );

    const user = {
      // whiteLabelData: result[1] > 1,
      ...result[0],
    };
    return this.flatAuthorities(user);
  }

  async find(options: FindManyOptions<User>): Promise<User | undefined> {
    options.relations = ['adminWhiteLabel'];
    const result = await this.userRepository.findOne(options);

    return this.flatAuthorities(result);
  }

  async profileSelectAll(profile, permission): Promise<any> {
    const optionsProfile = { where: { id: profile['id'] } };
    const resultProfile = await this.profileRepository.findOne(optionsProfile);
    await getManager().query(`DELETE FROM permission_profile WHERE profile_id=${resultProfile.id}`);
    permission.forEach((element) => {
      const optionsPermission: any = {
        where: {
          profile: { id: resultProfile.id },
          permission: { id: element['id'] },
        },
      };
      this.permissionProfileRepository.findOne(optionsPermission).then((v) => {
        const entity = {
          profile: profile['id'],
          permission: element['id'],
          lastModifiedDate: new Date(),
          activateProfessional: true,
          canDelete: true,
          confirmPayment: true,
          deletePhoto: true,
          edit: true,
          editLocation: true,
          evolution: true,
          financialValue: true,
          manualRemoval: true,
          professionalName: true,
          professionalRegister: true,
          report: true,
          resgister: true,
          view: true,
          valueAuthorization: true,
        };

        if (v) entity['id'] = v.id;
        else entity['createdDate'] = new Date();
        this.permissionProfileRepository.save(entity);
      });
    });
    return resultProfile;
  }

  async profileUnselectAll(profile, permission): Promise<any> {
    const optionsProfile = { where: { id: profile['id'] } };
    const resultProfile = await this.profileRepository.findOne(optionsProfile);
    await getManager().query(`DELETE FROM permission_profile WHERE profile_id=${resultProfile.id}`);
    permission.forEach((element) => {
      const optionsPermission: any = {
        where: { profile: resultProfile.id, permission: element['id'] },
      };
      this.permissionProfileRepository.findOne(optionsPermission).then((v) => {
        const entity = {
          profile: profile['id'],
          permission: element['id'],
          activateProfessional: false,
          canDelete: false,
          confirmPayment: false,
          deletePhoto: false,
          edit: false,
          editLocation: false,
          evolution: false,
          financialValue: false,
          manualRemoval: false,
          professionalName: false,
          professionalRegister: false,
          report: false,
          resgister: false,
          view: false,
          valueAuthorization: false,
        };

        if (v) entity['id'] = v.id;
        else entity['createdDate'] = new Date();
        this.permissionProfileRepository.save(entity);
      });
    });
    return resultProfile;
  }

  async userSelectAll(user, permission): Promise<any> {
    const optionsUser = { where: { id: user['id'] } };
    const resultUser = await this.userRepository.findOne(optionsUser);
    await getManager().query(`DELETE FROM permission_user WHERE user_id=${resultUser.id}`);
    permission.forEach((element) => {
      const optionsPermission: any = {
        where: { user: resultUser.id, permission: element['id'] },
      };
      this.permissionUserRepository.findOne(optionsPermission).then((v) => {
        const entity = {
          user: user['id'],
          permission: element['id'],
          lastModifiedDate: new Date(),
          activateProfessional: true,
          canDelete: true,
          confirmPayment: true,
          deletePhoto: true,
          edit: true,
          editLocation: true,
          evolution: true,
          financialValue: true,
          manualRemoval: true,
          professionalName: true,
          professionalRegister: true,
          report: true,
          resgister: true,
          view: true,
          valueAuthorization: true,
        };

        if (v) entity['id'] = v.id;
        else entity['createdDate'] = new Date();
        this.permissionUserRepository.save(entity);
      });
    });
    return resultUser;
  }

  async userUnselectAll(user, permission): Promise<any> {
    const optionsUser = { where: { id: user['id'] } };
    const resultUser = await this.userRepository.findOne(optionsUser);
    await getManager().query(`DELETE FROM permission_user WHERE user_id=${resultUser.id}`);
    permission.forEach((element) => {
      const optionsPermission: any = {
        where: { user: resultUser.id, permission: element['id'] },
      };
      this.permissionUserRepository.findOne(optionsPermission).then((v) => {
        const entity = {
          user: user['id'],
          permission: element['id'],
          activateProfessional: false,
          canDelete: false,
          confirmPayment: false,
          deletePhoto: false,
          edit: false,
          editLocation: false,
          evolution: false,
          financialValue: false,
          manualRemoval: false,
          professionalName: false,
          professionalRegister: false,
          report: false,
          resgister: false,
          view: false,
          valueAuthorization: false,
        };

        if (v) entity['id'] = v.id;
        else entity['createdDate'] = new Date();
        this.permissionUserRepository.save(entity);
      });
    });
    return resultUser;
  }

  async findAndCount(options: FindManyOptions<User>): Promise<[User[], number]> {
    options.relations = [];
    const resultList = await this.userRepository.findAndCount(options);
    const users: User[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach((user) => users.push(this.flatAuthorities(user)));
      resultList[0] = users;
    }
    return resultList;
  }

  async save(user: User): Promise<User | undefined> {
    user = this.convertInAuthorities(user);
    const element = await this.userRepository.save(user);
    const auditEntityLast = await this.auditEntityRepository.findOne({
      where: { entityType: 'User', entityId: element.id },
      order: { id: 'DESC' },
    });
    this.auditEntityRepository.save({
      createdDate: element.createdDate,
      createdBy: element.createdBy,
      entityId: element.id,
      entityType: 'User',
      action: 'CREATE',
      entityValue: JSON.stringify(user),
      commitVersion: auditEntityLast ? auditEntityLast.commitVersion + 1 : 1,
    });

    return this.flatAuthorities(element);
  }

  async saveAll(user: User): Promise<User | undefined> {
    user = this.convertInAuthorities(user);
    const element = await this.userRepository.save(user);
    const auditEntityLast = await this.auditEntityRepository.findOne({
      where: { entityType: 'User', entityId: element.id },
      order: { id: 'DESC' },
    });
    this.auditEntityRepository.save({
      createdDate: element.createdDate,
      createdBy: element.createdBy,
      entityId: element.id,
      entityType: 'User',
      action: 'CREATE',
      entityValue: JSON.stringify(user),
      commitVersion: auditEntityLast.commitVersion + 1,
    });

    return this.flatAuthorities(element);
  }

  async update(user: User): Promise<User | undefined> {
    user = this.convertInAuthorities({
      ...user,
      authorities: ['ROLE_ADMIN'],
    });
    const element = await this.userRepository.save(user);
    const auditEntityLast = await this.auditEntityRepository.findOne({
      where: { entityType: 'User', entityId: element.id },
      order: { id: 'DESC' },
    });
    if (typeof user['deletedAt'] !== 'undefined' && user['deletedAt'] !== null) {
      const entityKeyDiff = [];
      if (auditEntityLast) {
        const oldUser = JSON.parse(auditEntityLast.entityValue);

        var keys = Object.keys(user);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!['lastModifiedDate', 'createdDate', 'lastModifiedBy', 'createdBy'].includes(key) && JSON.stringify(user[key]) != JSON.stringify(oldUser[key])) {
            if (typeof user[key] === 'object') {
              entityKeyDiff.push(key);
            } else {
              entityKeyDiff.push(key);
            }
          }
        }
      }
      this.auditEntityRepository.save({
        createdDate: element.lastModifiedDate,
        createdBy: element.lastModifiedBy,
        entityId: element.id,
        entityType: 'User',
        action: 'DELETE',
        entityValue: JSON.stringify(user),
        entityKeyDiff: entityKeyDiff.join(','),
        commitVersion: auditEntityLast ? auditEntityLast.commitVersion + 1 : 1,
      });
    } else {
      const entityKeyDiff = [];
      if (auditEntityLast) {
        const oldUser = JSON.parse(auditEntityLast.entityValue);

        var keys = Object.keys(user);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!['lastModifiedDate', 'createdDate', 'lastModifiedBy', 'createdBy'].includes(key) && JSON.stringify(user[key]) != JSON.stringify(oldUser[key])) {
            if (typeof user[key] === 'object') {
              entityKeyDiff.push(key);
            } else {
              entityKeyDiff.push(key);
            }
          }
        }
      }
      this.auditEntityRepository.save({
        createdDate: element.lastModifiedDate,
        createdBy: element.lastModifiedBy,
        entityId: element.id,
        entityType: 'User',
        action: 'UPDATE',
        entityValue: JSON.stringify(user),
        entityKeyDiff: entityKeyDiff.join(','),
        commitVersion: auditEntityLast ? auditEntityLast.commitVersion + 1 : 1,
      });
    }

    return element;
  }

  async delete(user: User): Promise<User | undefined> {
    return await this.userRepository.remove(user);
  }

  private flatAuthorities(user: any): User {
    return user;
  }

  async saveProfilePermission(id, name, permission) {
    let resultProfile = {};
    if (id) {
      const optionsProfile = { where: { id } };
      resultProfile = await this.profileRepository.findOne(optionsProfile);
    }
    resultProfile['name'] = name;
    this.profileRepository.save(resultProfile);

    permission.forEach(async (element) => {
      let permissionProfile = null;
      if (element.id) {
        const optionsPermission = { where: { id: element.id } };
        permissionProfile = await this.permissionProfileRepository.findOne(optionsPermission);

        Object.keys(permissionProfile).forEach((v) => {
          permissionProfile[v] = element[v];
        });
      } else {
        permissionProfile = { ...element };
      }
      this.permissionProfileRepository.save(permissionProfile);
    });
    return resultProfile;
  }

  async saveUserPermission(id, permission) {
    const optionsUser = { where: { id } };
    const resultUser = await this.userRepository.findOne(optionsUser);

    permission.forEach(async (element) => {
      let permissionUser = null;
      if (element.id) {
        const optionsPermission = { where: { id: element.id } };
        permissionUser = await this.permissionUserRepository.findOne(optionsPermission);

        Object.keys(permissionUser).forEach((v) => {
          permissionUser[v] = element[v];
        });
      } else {
        permissionUser = { ...element };
      }

      this.permissionUserRepository.save(permissionUser);
    });
    return resultUser;
  }

  private convertInAuthorities(user: any): User {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach((authority) => authorities.push({ name: authority }));
      user.authorities = authorities;
    }
    return user;
  }

  private sleepFunction = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
