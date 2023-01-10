import { AdminPermissionUser } from './_base/admin-permission-user.entity';
import { DataSource } from 'typeorm';

export const adminPermissionUserProviders = [
    {
        provide: 'ADMINPERMISSIONUSER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminPermissionUser),
        inject: ['DATA_SOURCE'],
    },
];
