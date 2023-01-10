import { AdminAuthority } from './_base/admin-authority.entity';
import { DataSource } from 'typeorm';

export const adminAuthorityProviders = [
    {
        provide: 'ADMINAUTHORITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminAuthority),
        inject: ['DATA_SOURCE'],
    },
];
