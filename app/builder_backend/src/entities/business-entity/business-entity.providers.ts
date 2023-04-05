import { BusinessEntity } from './_base/business-entity.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IBusinessEntityRepository extends Repository<BusinessEntity> {}

export const businessEntityProviders = [
    {
        provide: 'BUSINESSENTITY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BusinessEntity).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
