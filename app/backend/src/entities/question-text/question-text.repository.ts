import { EntityRepository, Repository } from 'typeorm';
import { QuestionText } from './_base/question-text.entity';

@EntityRepository(QuestionText)
export class QuestionTextRepository extends Repository<QuestionText> {}
