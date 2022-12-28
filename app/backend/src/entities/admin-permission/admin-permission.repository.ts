import { EntityRepository, Repository } from 'typeorm';
import { AdminPermission } from './_base/admin-permission.entity';

@EntityRepository(AdminPermission)
export class AdminPermissionRepository extends Repository<AdminPermission> {}
