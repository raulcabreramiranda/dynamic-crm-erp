import { AdminProfile } from './_base/admin-profile.entity';
import { DataSource } from 'typeorm';

export const adminProfileProviders = [
    {
        provide: 'ADMINPROFILE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminProfile),
        inject: ['DATA_SOURCE'],
    },
];
