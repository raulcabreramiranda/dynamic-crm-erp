import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IDisciplineSuperPro {
    id?: number;
    shortNameSuperPro?: string;
    nameSuperPro?: string;
    shortName?: string;
    name?: string;
    level1Id?: number;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IDisciplineSuperPro> = {
    id: 0,
};

export default () => <div />;
