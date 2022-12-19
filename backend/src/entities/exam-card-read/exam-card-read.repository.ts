import { EntityRepository, Repository } from 'typeorm';
import { ExamCardRead } from './_base/exam-card-read.entity';

@EntityRepository(ExamCardRead)
export class ExamCardReadRepository extends Repository<ExamCardRead> {}
