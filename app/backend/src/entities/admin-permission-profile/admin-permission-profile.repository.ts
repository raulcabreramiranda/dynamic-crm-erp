import { EntityRepository, Repository } from 'typeorm';
import { AdminPermissionProfile } from './_base/admin-permission-profile.entity';

@EntityRepository(AdminPermissionProfile)
export class AdminPermissionProfileRepository extends Repository<AdminPermissionProfile> {}
