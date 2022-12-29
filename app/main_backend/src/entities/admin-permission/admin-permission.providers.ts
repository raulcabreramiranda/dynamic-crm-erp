import { AdminPermission } from './_base/admin-permission.entity';
import { DataSource } from 'typeorm';

export const adminPermissionProviders = [
    {
        provide: 'ADMINPERMISSION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminPermission),
        inject: ['DATA_SOURCE'],
    },
];
