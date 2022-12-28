import { EntityRepository, Repository } from 'typeorm';
import { StudentQuestion } from './_base/student-question.entity';

@EntityRepository(StudentQuestion)
export class StudentQuestionRepository extends Repository<StudentQuestion> {}
