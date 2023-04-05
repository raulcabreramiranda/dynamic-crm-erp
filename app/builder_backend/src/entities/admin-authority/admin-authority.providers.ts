import { AdminAuthority } from './_base/admin-authority.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminAuthorityRepository extends Repository<AdminAuthority> {}

export const adminAuthorityProviders = [
    {
        provide: 'ADMINAUTHORITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminAuthority).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
