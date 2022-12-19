import { EntityRepository, Repository } from 'typeorm';
import { ReportByQuery } from './_base/report-by-query.entity';

@EntityRepository(ReportByQuery)
export class ReportByQueryRepository extends Repository<ReportByQuery> {}
