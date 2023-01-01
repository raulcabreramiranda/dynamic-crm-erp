import { Dayjs } from 'dayjs';

export interface IAdminAuditEntity {
    id?: number;
    entityId?: number;
    entityType?: string;
    action?: string;
    entityValue?: any;
    entityKeyDiff?: any;
    commitVersion?: number;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IAdminAuditEntity> = {
    id: 0,
};

export default () => <div />;
