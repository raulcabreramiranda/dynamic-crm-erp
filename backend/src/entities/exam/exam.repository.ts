import { EntityRepository, Repository } from 'typeorm';
import { Exam } from './_base/exam.entity';

@EntityRepository(Exam)
export class ExamRepository extends Repository<Exam> {}
