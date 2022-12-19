import { EntityRepository, Repository } from 'typeorm';
import { ExamType } from './_base/exam-type.entity';

@EntityRepository(ExamType)
export class ExamTypeRepository extends Repository<ExamType> {}
