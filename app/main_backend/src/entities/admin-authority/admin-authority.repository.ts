import { EntityRepository, Repository } from 'typeorm';
import { AdminAuthority } from './_base/admin-authority.entity';

@EntityRepository(AdminAuthority)
export class AdminAuthorityRepository extends Repository<AdminAuthority> {}
