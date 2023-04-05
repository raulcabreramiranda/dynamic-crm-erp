import { AdminWhiteLabel } from './_base/admin-white-label.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IAdminWhiteLabelRepository extends Repository<AdminWhiteLabel> {}

export const adminWhiteLabelProviders = [
    {
        provide: 'ADMINWHITELABEL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminWhiteLabel).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
