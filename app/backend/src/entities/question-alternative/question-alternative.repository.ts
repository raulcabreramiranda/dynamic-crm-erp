import { EntityRepository, Repository } from 'typeorm';
import { QuestionAlternative } from './_base/question-alternative.entity';

@EntityRepository(QuestionAlternative)
export class QuestionAlternativeRepository extends Repository<QuestionAlternative> {}
