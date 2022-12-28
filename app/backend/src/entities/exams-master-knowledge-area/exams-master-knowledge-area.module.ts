import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamsMasterKnowledgeAreaRepository } from './exams-master-knowledge-area.repository';

import { ExamsMasterKnowledgeAreaController } from './exams-master-knowledge-area.controller';

import { ExamsMasterKnowledgeAreaService } from './exams-master-knowledge-area.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamsMasterKnowledgeAreaRepository, UserRepository])],
    controllers: [ExamsMasterKnowledgeAreaController],
    providers: [ExamsMasterKnowledgeAreaService],
    exports: [ExamsMasterKnowledgeAreaService],
})
export class ExamsMasterKnowledgeAreaModule {}
