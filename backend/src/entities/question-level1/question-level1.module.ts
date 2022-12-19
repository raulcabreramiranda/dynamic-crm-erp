import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionLevel1Repository } from './question-level1.repository';

import { QuestionLevel1Controller } from './question-level1.controller';

import { QuestionLevel1Service } from './question-level1.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionLevel1Repository, UserRepository])],
    controllers: [QuestionLevel1Controller],
    providers: [QuestionLevel1Service],
    exports: [QuestionLevel1Service],
})
export class QuestionLevel1Module {}
