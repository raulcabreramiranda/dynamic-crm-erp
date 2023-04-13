import { Subsidiary } from './_base/subsidiary.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface ISubsidiaryRepository extends Repository<Subsidiary> {}

export const subsidiaryProviders = [
    {
        provide: 'SUBSIDIARY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Subsidiary).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
