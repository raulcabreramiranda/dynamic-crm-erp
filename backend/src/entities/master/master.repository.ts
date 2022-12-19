import { EntityRepository, Repository } from 'typeorm';
import { Master } from './_base/master.entity';

@EntityRepository(Master)
export class MasterRepository extends Repository<Master> {}
