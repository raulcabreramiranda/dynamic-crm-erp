import { EntityRepository, Repository } from 'typeorm';
import { DisciplineSuperPro } from './_base/discipline-super-pro.entity';

@EntityRepository(DisciplineSuperPro)
export class DisciplineSuperProRepository extends Repository<DisciplineSuperPro> {}
