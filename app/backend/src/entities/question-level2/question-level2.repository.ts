import { EntityRepository, Repository } from 'typeorm';
import { QuestionLevel2 } from './_base/question-level2.entity';

@EntityRepository(QuestionLevel2)
export class QuestionLevel2Repository extends Repository<QuestionLevel2> {}
