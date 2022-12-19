import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ReportByQueryRepository } from './report-by-query.repository';

import { ReportByQueryController } from './report-by-query.controller';

import { ReportByQueryService } from './report-by-query.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ReportByQueryRepository, UserRepository])],
    controllers: [ReportByQueryController],
    providers: [ReportByQueryService],
    exports: [ReportByQueryService],
})
export class ReportByQueryModule {}
