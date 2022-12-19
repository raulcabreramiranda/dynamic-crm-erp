import { EntityRepository, Repository } from 'typeorm';
import { ReportQueryTemplate } from './_base/report-query-template.entity';

@EntityRepository(ReportQueryTemplate)
export class ReportQueryTemplateRepository extends Repository<ReportQueryTemplate> {}
