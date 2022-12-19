import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamTypeRepository } from './exam-type.repository';

import { ExamTypeController } from './exam-type.controller';

import { ExamTypeService } from './exam-type.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamTypeRepository, UserRepository])],
    controllers: [ExamTypeController],
    providers: [ExamTypeService],
    exports: [ExamTypeService],
})
export class ExamTypeModule {}
