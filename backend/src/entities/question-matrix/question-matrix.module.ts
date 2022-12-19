import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { QuestionMatrixRepository } from './question-matrix.repository';

import { QuestionMatrixController } from './question-matrix.controller';

import { QuestionMatrixService } from './question-matrix.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([QuestionMatrixRepository, UserRepository])],
    controllers: [QuestionMatrixController],
    providers: [QuestionMatrixService],
    exports: [QuestionMatrixService],
})
export class QuestionMatrixModule {}
