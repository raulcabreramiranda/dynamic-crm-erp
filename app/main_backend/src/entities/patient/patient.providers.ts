import { Patient } from './_base/patient.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IPatientRepository extends Repository<Patient> {}

export const patientProviders = [
    {
        provide: 'PATIENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Patient).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
