import { EntityRepository, Repository } from 'typeorm';
import { AdminWhiteLabel } from './_base/admin-white-label.entity';

@EntityRepository(AdminWhiteLabel)
export class AdminWhiteLabelRepository extends Repository<AdminWhiteLabel> {}
