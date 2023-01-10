import { AdminUser } from './_base/admin-user.entity';
import { DataSource } from 'typeorm';

export const adminUserProviders = [
    {
        provide: 'ADMINUSER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminUser),
        inject: ['DATA_SOURCE'],
    },
];
