import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { KnowledgeAreaRepository } from './knowledge-area.repository';

import { KnowledgeAreaController } from './knowledge-area.controller';

import { KnowledgeAreaService } from './knowledge-area.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([KnowledgeAreaRepository, UserRepository])],
    controllers: [KnowledgeAreaController],
    providers: [KnowledgeAreaService],
    exports: [KnowledgeAreaService],
})
export class KnowledgeAreaModule {}
