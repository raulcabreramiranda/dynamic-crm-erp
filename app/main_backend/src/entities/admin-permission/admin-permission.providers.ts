import { AdminPermission } from './_base/admin-permission.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminPermissionRepository extends Repository<AdminPermission> {}

export const adminPermissionProviders = [
    {
        provide: 'ADMINPERMISSION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminPermission).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
