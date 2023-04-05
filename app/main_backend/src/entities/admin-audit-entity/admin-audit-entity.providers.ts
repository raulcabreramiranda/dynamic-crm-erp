import { AdminAuditEntity } from './_base/admin-audit-entity.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminAuditEntityRepository extends Repository<AdminAuditEntity> {}

export const adminAuditEntityProviders = [
    {
        provide: 'ADMINAUDITENTITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminAuditEntity).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
