import { EntityRepository, Repository } from 'typeorm';
import { ReportSubquery } from './_base/report-subquery.entity';

@EntityRepository(ReportSubquery)
export class ReportSubqueryRepository extends Repository<ReportSubquery> {}
