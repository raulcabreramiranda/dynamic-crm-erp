import { ITrainingEnvironmentComponent } from '../../trainingEnvironmentComponent/_base/training-environment-component-model';
import { TypeContent } from '../../../../components/enumerations/type-content.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ITrainingEnvironmentContent {
    id?: number;
    description?: string;
    title?: string;
    hour?: string;
    link?: string;
    typeContent?: TypeContent;
    trainingEnvironmentComponent?: ITrainingEnvironmentComponent;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ITrainingEnvironmentContent> = {
    id: 0,
};

export default () => <div />;
