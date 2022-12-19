import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamTemplateRepository } from './exam-template.repository';

import { ExamTemplateController } from './exam-template.controller';

import { ExamTemplateService } from './exam-template.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamTemplateRepository, UserRepository])],
    controllers: [ExamTemplateController],
    providers: [ExamTemplateService],
    exports: [ExamTemplateService],
})
export class ExamTemplateModule {}
