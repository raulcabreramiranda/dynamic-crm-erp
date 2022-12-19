import { EntityRepository, Repository } from 'typeorm';
import { QuestionLevels } from './_base/question-levels.entity';

@EntityRepository(QuestionLevels)
export class QuestionLevelsRepository extends Repository<QuestionLevels> {}
