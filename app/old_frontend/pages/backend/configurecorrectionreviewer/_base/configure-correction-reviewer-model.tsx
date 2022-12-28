import { IConfigureCorrection } from '../../configurecorrection/_base/configure-correction-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IConfigureCorrectionReviewer {
    id?: number;
    percent?: number;
    configureCorrection?: IConfigureCorrection;
    user?: IAdminUser;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IConfigureCorrectionReviewer> = {
    id: 0,
};

export default () => <div />;
