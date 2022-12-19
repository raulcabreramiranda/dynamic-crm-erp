import { EntityRepository, Repository } from 'typeorm';
import { CerneClass } from './_base/cerne-class.entity';

@EntityRepository(CerneClass)
export class CerneClassRepository extends Repository<CerneClass> {}
