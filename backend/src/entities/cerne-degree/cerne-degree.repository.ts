import { EntityRepository, Repository } from 'typeorm';
import { CerneDegree } from './_base/cerne-degree.entity';

@EntityRepository(CerneDegree)
export class CerneDegreeRepository extends Repository<CerneDegree> {}
