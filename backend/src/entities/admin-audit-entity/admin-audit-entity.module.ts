import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminAuditEntityRepository } from './admin-audit-entity.repository';

import { AdminAuditEntityController } from './admin-audit-entity.controller';

import { AdminAuditEntityService } from './admin-audit-entity.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminAuditEntityRepository, UserRepository])],
    controllers: [AdminAuditEntityController],
    providers: [AdminAuditEntityService],
    exports: [AdminAuditEntityService],
})
export class AdminAuditEntityModule {}
