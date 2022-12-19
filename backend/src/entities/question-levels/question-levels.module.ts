import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionLevelsRepository } from './question-levels.repository';

import { QuestionLevelsController } from './question-levels.controller';

import { QuestionLevelsService } from './question-levels.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionLevelsRepository, UserRepository])],
    controllers: [QuestionLevelsController],
    providers: [QuestionLevelsService],
    exports: [QuestionLevelsService],
})
export class QuestionLevelsModule {}
