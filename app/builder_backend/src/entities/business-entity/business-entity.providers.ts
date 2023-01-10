import { BusinessEntity } from './_base/business-entity.entity';
import { DataSource } from 'typeorm';

export const businessEntityProviders = [
    {
        provide: 'BUSINESSENTITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BusinessEntity),
        inject: ['DATA_SOURCE'],
    },
];
