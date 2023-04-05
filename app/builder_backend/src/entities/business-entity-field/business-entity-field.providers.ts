import { BusinessEntityField } from './_base/business-entity-field.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IBusinessEntityFieldRepository extends Repository<BusinessEntityField> {}

export const businessEntityFieldProviders = [
    {
        provide: 'BUSINESSENTITYFIELD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BusinessEntityField).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
