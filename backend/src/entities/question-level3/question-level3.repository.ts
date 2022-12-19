import { EntityRepository, Repository } from 'typeorm';
import { QuestionLevel3 } from './_base/question-level3.entity';

@EntityRepository(QuestionLevel3)
export class QuestionLevel3Repository extends Repository<QuestionLevel3> {}
