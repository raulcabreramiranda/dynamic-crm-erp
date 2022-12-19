import { EntityRepository, Repository } from 'typeorm';
import { ReportCategory } from './_base/report-category.entity';

@EntityRepository(ReportCategory)
export class ReportCategoryRepository extends Repository<ReportCategory> {}
