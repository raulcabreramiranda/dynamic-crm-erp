import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionAlternativeRepository } from './question-alternative.repository';

import { QuestionAlternativeController } from './question-alternative.controller';

import { QuestionAlternativeService } from './question-alternative.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionAlternativeRepository, UserRepository])],
    controllers: [QuestionAlternativeController],
    providers: [QuestionAlternativeService],
    exports: [QuestionAlternativeService],
})
export class QuestionAlternativeModule {}
