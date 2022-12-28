import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionImportTemplateRepository } from './question-import-template.repository';

import { QuestionImportTemplateController } from './question-import-template.controller';

import { QuestionImportTemplateService } from './question-import-template.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionImportTemplateRepository, UserRepository])],
    controllers: [QuestionImportTemplateController],
    providers: [QuestionImportTemplateService],
    exports: [QuestionImportTemplateService],
})
export class QuestionImportTemplateModule {}
