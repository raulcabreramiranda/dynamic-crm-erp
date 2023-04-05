import { AdminPermissionProfile } from './_base/admin-permission-profile.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminPermissionProfileRepository extends Repository<AdminPermissionProfile> {}

export const adminPermissionProfileProviders = [
    {
        provide: 'ADMINPERMISSIONPROFILE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminPermissionProfile).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
