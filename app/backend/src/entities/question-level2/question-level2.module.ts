import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionLevel2Repository } from './question-level2.repository';

import { QuestionLevel2Controller } from './question-level2.controller';

import { QuestionLevel2Service } from './question-level2.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionLevel2Repository, UserRepository])],
    controllers: [QuestionLevel2Controller],
    providers: [QuestionLevel2Service],
    exports: [QuestionLevel2Service],
})
export class QuestionLevel2Module {}
