import { BusinessEntityField } from './_base/business-entity-field.entity';
import { DataSource } from 'typeorm';

export const businessEntityFieldProviders = [
    {
        provide: 'BUSINESSENTITYFIELD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BusinessEntityField),
        inject: ['DATA_SOURCE'],
    },
];
