import { EntityRepository, Repository } from 'typeorm';
import { AdminUser } from './_base/admin-user.entity';

@EntityRepository(AdminUser)
export class AdminUserRepository extends Repository<AdminUser> {}
