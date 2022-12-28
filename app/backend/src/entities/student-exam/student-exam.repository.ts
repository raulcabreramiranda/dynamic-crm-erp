import { EntityRepository, Repository } from 'typeorm';
import { StudentExam } from './_base/student-exam.entity';

@EntityRepository(StudentExam)
export class StudentExamRepository extends Repository<StudentExam> {}
