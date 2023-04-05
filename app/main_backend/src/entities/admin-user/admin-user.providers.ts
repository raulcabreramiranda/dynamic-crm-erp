import { AdminUser } from './_base/admin-user.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminUserRepository extends Repository<AdminUser> {}

export const adminUserProviders = [
    {
        provide: 'ADMINUSER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminUser).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
