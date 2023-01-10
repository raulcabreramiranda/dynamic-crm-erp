import { AdminAuditEntity } from './_base/admin-audit-entity.entity';
import { DataSource } from 'typeorm';

export const adminAuditEntityProviders = [
    {
        provide: 'ADMINAUDITENTITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminAuditEntity),
        inject: ['DATA_SOURCE'],
    },
];
