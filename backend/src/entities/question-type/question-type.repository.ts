import { EntityRepository, Repository } from 'typeorm';
import { QuestionType } from './_base/question-type.entity';

@EntityRepository(QuestionType)
export class QuestionTypeRepository extends Repository<QuestionType> {}
