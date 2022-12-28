import { EntityRepository, Repository } from 'typeorm';
import { AdminUserSuperPro } from './_base/admin-user-super-pro.entity';

@EntityRepository(AdminUserSuperPro)
export class AdminUserSuperProRepository extends Repository<AdminUserSuperPro> {}
