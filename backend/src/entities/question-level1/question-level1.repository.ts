import { EntityRepository, Repository } from 'typeorm';
import { QuestionLevel1 } from './_base/question-level1.entity';

@EntityRepository(QuestionLevel1)
export class QuestionLevel1Repository extends Repository<QuestionLevel1> {}
