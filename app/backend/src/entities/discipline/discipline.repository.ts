import { EntityRepository, Repository } from 'typeorm';
import { Discipline } from './_base/discipline.entity';

@EntityRepository(Discipline)
export class DisciplineRepository extends Repository<Discipline> {}
