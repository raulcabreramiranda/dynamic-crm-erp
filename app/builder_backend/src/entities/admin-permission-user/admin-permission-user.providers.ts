import { AdminPermissionUser } from './_base/admin-permission-user.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminPermissionUserRepository extends Repository<AdminPermissionUser> {}

export const adminPermissionUserProviders = [
    {
        provide: 'ADMINPERMISSIONUSER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminPermissionUser).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
