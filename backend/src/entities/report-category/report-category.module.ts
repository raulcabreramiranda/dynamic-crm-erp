import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ReportCategoryRepository } from './report-category.repository';

import { ReportCategoryController } from './report-category.controller';

import { ReportCategoryService } from './report-category.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ReportCategoryRepository, UserRepository])],
    controllers: [ReportCategoryController],
    providers: [ReportCategoryService],
    exports: [ReportCategoryService],
})
export class ReportCategoryModule {}
