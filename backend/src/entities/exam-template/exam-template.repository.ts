import { EntityRepository, Repository } from 'typeorm';
import { ExamTemplate } from './_base/exam-template.entity';

@EntityRepository(ExamTemplate)
export class ExamTemplateRepository extends Repository<ExamTemplate> {}
