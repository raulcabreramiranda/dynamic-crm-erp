import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ReportQueryTemplateRepository } from './report-query-template.repository';

import { ReportQueryTemplateController } from './report-query-template.controller';

import { ReportQueryTemplateService } from './report-query-template.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ReportQueryTemplateRepository, UserRepository])],
    controllers: [ReportQueryTemplateController],
    providers: [ReportQueryTemplateService],
    exports: [ReportQueryTemplateService],
})
export class ReportQueryTemplateModule {}
