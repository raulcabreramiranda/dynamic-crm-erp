import { EntityRepository, Repository } from 'typeorm';
import { OLDCerneSchool } from './_base/o-l-d-cerne-school.entity';

@EntityRepository(OLDCerneSchool)
export class OLDCerneSchoolRepository extends Repository<OLDCerneSchool> {}
