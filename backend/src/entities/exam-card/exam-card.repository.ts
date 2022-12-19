import { EntityRepository, Repository } from 'typeorm';
import { ExamCard } from './_base/exam-card.entity';

@EntityRepository(ExamCard)
export class ExamCardRepository extends Repository<ExamCard> {}
