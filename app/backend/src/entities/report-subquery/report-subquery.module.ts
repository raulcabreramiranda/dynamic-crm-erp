import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ReportSubqueryRepository } from './report-subquery.repository';

import { ReportSubqueryController } from './report-subquery.controller';

import { ReportSubqueryService } from './report-subquery.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ReportSubqueryRepository, UserRepository])],
    controllers: [ReportSubqueryController],
    providers: [ReportSubqueryService],
    exports: [ReportSubqueryService],
})
export class ReportSubqueryModule {}
