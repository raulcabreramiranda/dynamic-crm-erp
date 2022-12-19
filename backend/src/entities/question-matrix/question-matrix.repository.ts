import { EntityRepository, Repository } from 'typeorm';
import { QuestionMatrix } from './_base/question-matrix.entity';

@EntityRepository(QuestionMatrix)
export class QuestionMatrixRepository extends Repository<QuestionMatrix> {}
