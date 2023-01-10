import { AdminWhiteLabel } from './_base/admin-white-label.entity';
import { DataSource } from 'typeorm';

export const adminWhiteLabelProviders = [
    {
        provide: 'ADMINWHITELABEL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AdminWhiteLabel),
        inject: ['DATA_SOURCE'],
    },
];
