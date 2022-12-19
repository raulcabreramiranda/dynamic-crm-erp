import { EntityRepository, Repository } from 'typeorm';
import { QuestionImportTemplate } from './_base/question-import-template.entity';

@EntityRepository(QuestionImportTemplate)
export class QuestionImportTemplateRepository extends Repository<QuestionImportTemplate> {}
