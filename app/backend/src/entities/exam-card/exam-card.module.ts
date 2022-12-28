import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamCardRepository } from './exam-card.repository';

import { ExamCardController } from './exam-card.controller';

import { ExamCardService } from './exam-card.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamCardRepository, UserRepository])],
    controllers: [ExamCardController],
    providers: [ExamCardService],
    exports: [ExamCardService],
})
export class ExamCardModule {}
