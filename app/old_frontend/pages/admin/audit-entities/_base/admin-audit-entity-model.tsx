import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminAuditEntity {
    id?: number;
    entityId?: number;
    entityType?: string;
    action?: string;
    entityValue?: any;
    entityKeyDiff?: any;
    commitVersion?: number;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminAuditEntity> = {
    id: 0,
};

export default () => <div />;
