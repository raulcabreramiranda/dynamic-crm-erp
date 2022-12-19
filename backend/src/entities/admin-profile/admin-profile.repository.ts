import { EntityRepository, Repository } from 'typeorm';
import { AdminProfile } from './_base/admin-profile.entity';

@EntityRepository(AdminProfile)
export class AdminProfileRepository extends Repository<AdminProfile> {}
