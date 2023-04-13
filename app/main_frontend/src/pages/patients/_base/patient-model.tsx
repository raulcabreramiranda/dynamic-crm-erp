import { PatientSex } from '../../../components/enumerations/patient-sex.model';
import { PatientLiminar } from '../../../components/enumerations/patient-liminar.model';
import { PatientStatus } from '../../../components/enumerations/patient-status.model';
import { PatientAdId } from '../../../components/enumerations/patient-ad-id.model';
import { PatientPatientComplexity } from '../../../components/enumerations/patient-patient-complexity.model';
import { PatientObese } from '../../../components/enumerations/patient-obese.model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathPatient = 'patients';
export interface IPatient {
    id?: number;
    name?: string;
    cpf?: string;
    rg?: string;
    sex?: PatientSex;
    birthDate?: string;
    weight?: number;
    height?: number;
    healthPlanEnrollment?: string;
    liminar?: PatientLiminar;
    observations?: any;
    informationProfessional?: string;
    register?: boolean;
    zipCode?: string;
    hospitalReference?: string;
    street?: string;
    complement?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    uf?: string;
    reference?: string;
    lat?: number;
    lng?: number;
    status?: PatientStatus;
    adId?: PatientAdId;
    nead?: number;
    patientComplexity?: PatientPatientComplexity;
    obese?: PatientObese;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IPatientFilter {
    id?: IFilter<number>;
    name?: IFilter<string>;
    cpf?: IFilter<string>;
    rg?: IFilter<string>;
    sex?: IFilter<PatientSex>;
    birthDate?: IFilter<string>;
    weight?: IFilter<number>;
    height?: IFilter<number>;
    healthPlanEnrollment?: IFilter<string>;
    liminar?: IFilter<PatientLiminar>;
    observations?: IFilter<any>;
    informationProfessional?: IFilter<string>;
    register?: IFilter<boolean>;
    zipCode?: IFilter<string>;
    hospitalReference?: IFilter<string>;
    street?: IFilter<string>;
    complement?: IFilter<string>;
    number?: IFilter<string>;
    neighborhood?: IFilter<string>;
    city?: IFilter<string>;
    uf?: IFilter<string>;
    reference?: IFilter<string>;
    lat?: IFilter<number>;
    lng?: IFilter<number>;
    status?: IFilter<PatientStatus>;
    adId?: IFilter<PatientAdId>;
    nead?: IFilter<number>;
    patientComplexity?: IFilter<PatientPatientComplexity>;
    obese?: IFilter<PatientObese>;
}

export interface IPatientFilters extends IPatient {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IPatient> = {
    id: 0,
};

export default () => <div />;
