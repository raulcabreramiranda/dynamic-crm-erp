import { EntityRepository, Repository } from 'typeorm';
import { JorneyDegree } from './_base/jorney-degree.entity';

@EntityRepository(JorneyDegree)
export class JorneyDegreeRepository extends Repository<JorneyDegree> {}
