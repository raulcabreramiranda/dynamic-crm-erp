import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionTextRepository } from './question-text.repository';

import { QuestionTextController } from './question-text.controller';

import { QuestionTextService } from './question-text.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionTextRepository, UserRepository])],
    controllers: [QuestionTextController],
    providers: [QuestionTextService],
    exports: [QuestionTextService],
})
export class QuestionTextModule {}
