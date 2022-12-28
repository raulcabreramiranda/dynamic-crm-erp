import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionLevel3Repository } from './question-level3.repository';

import { QuestionLevel3Controller } from './question-level3.controller';

import { QuestionLevel3Service } from './question-level3.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionLevel3Repository, UserRepository])],
    controllers: [QuestionLevel3Controller],
    providers: [QuestionLevel3Service],
    exports: [QuestionLevel3Service],
})
export class QuestionLevel3Module {}
