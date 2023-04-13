import { Company } from './_base/company.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface ICompanyRepository extends Repository<Company> {}

export const companyProviders = [
    {
        provide: 'COMPANY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Company).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
