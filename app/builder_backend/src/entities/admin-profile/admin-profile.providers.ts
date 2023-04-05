import { AdminProfile } from './_base/admin-profile.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminProfileRepository extends Repository<AdminProfile> {}

export const adminProfileProviders = [
    {
        provide: 'ADMINPROFILE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminProfile).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
