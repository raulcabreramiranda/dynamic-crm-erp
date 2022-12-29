import { AdminPermissionProfile } from './_base/admin-permission-profile.entity';
import { DataSource } from 'typeorm';

export const adminPermissionProfileProviders = [
    {
        provide: 'ADMINPERMISSIONPROFILE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminPermissionProfile),
        inject: ['DATA_SOURCE'],
    },
];
