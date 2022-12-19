import { EntityRepository, Repository } from 'typeorm';
import { Question } from './_base/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
