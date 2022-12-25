import { ITrainingEnvironmentComponent } from '../../../backend/trainingEnvironmentComponent/_base/training-environment-component-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ITrainingEnvironment {
    id?: number;
    description?: string;
    title?: string;
    hour?: string;
    trainingEnvironmentComponent?: ITrainingEnvironmentComponent[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ITrainingEnvironment> = {
    id: 0,
};

export default () => <div />;
