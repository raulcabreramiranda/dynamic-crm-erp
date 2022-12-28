import { EntityRepository, Repository } from 'typeorm';
import { ExamsMaster } from './_base/exams-master.entity';

@EntityRepository(ExamsMaster)
export class ExamsMasterRepository extends Repository<ExamsMaster> {}
