import { EntityRepository, Repository } from 'typeorm';
import { QuestionLevel4 } from './_base/question-level4.entity';

@EntityRepository(QuestionLevel4)
export class QuestionLevel4Repository extends Repository<QuestionLevel4> {}
