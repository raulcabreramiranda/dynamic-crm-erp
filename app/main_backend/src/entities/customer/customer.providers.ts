import { Customer } from './_base/customer.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface ICustomerRepository extends Repository<Customer> {}

export const customerProviders = [
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
