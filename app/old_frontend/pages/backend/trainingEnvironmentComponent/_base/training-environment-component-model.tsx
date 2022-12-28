import { ITrainingEnvironment } from '../../trainingEnvironment/_base/training-environment-model';
import { ITrainingEnvironmentContent } from '../../trainingEnvironmentContent/_base/training-environment-content-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ITrainingEnvironmentComponent {
    id?: number;
    title?: string;
    description?: string;
    hour?: string;
    trainingEnvironment?: ITrainingEnvironment;
    trainingEnvironmentContent?: ITrainingEnvironmentContent[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ITrainingEnvironmentComponent> = {
    id: 0,
};

export default () => <div />;
