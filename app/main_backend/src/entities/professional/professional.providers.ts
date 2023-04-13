import { Professional } from './_base/professional.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IProfessionalRepository extends Repository<Professional> {}

export const professionalProviders = [
    {
        provide: 'PROFESSIONAL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Professional).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
