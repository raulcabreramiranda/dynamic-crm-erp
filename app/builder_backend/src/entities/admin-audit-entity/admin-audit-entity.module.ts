import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { AdminAuditEntityController } from './admin-audit-entity.controller';

import { adminAuditEntityProviders } from './admin-audit-entity.providers';

import { AdminAuditEntityService } from './admin-audit-entity.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminAuditEntityController],
    providers: [...adminAuditEntityProviders, AdminAuditEntityService],
    exports: [AdminAuditEntityService],
})
export class AdminAuditEntityModule {}
