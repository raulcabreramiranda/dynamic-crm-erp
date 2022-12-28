import { EntityRepository, Repository } from 'typeorm';
import { AdminPermissionUser } from './_base/admin-permission-user.entity';

@EntityRepository(AdminPermissionUser)
export class AdminPermissionUserRepository extends Repository<AdminPermissionUser> {}
