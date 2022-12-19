import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionLevel4Repository } from './question-level4.repository';

import { QuestionLevel4Controller } from './question-level4.controller';

import { QuestionLevel4Service } from './question-level4.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionLevel4Repository, UserRepository])],
    controllers: [QuestionLevel4Controller],
    providers: [QuestionLevel4Service],
    exports: [QuestionLevel4Service],
})
export class QuestionLevel4Module {}
