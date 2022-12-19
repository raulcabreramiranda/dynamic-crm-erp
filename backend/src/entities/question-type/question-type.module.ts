import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionTypeRepository } from './question-type.repository';

import { QuestionTypeController } from './question-type.controller';

import { QuestionTypeService } from './question-type.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionTypeRepository, UserRepository])],
    controllers: [QuestionTypeController],
    providers: [QuestionTypeService],
    exports: [QuestionTypeService],
})
export class QuestionTypeModule {}
