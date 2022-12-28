import { EntityRepository, Repository } from 'typeorm';
import { CerneSchool } from './_base/cerne-school.entity';

@EntityRepository(CerneSchool)
export class CerneSchoolRepository extends Repository<CerneSchool> {}
