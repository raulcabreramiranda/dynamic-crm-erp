import { Dayjs } from 'dayjs';

export interface IBusinessEntity {
    id?: number;
    entityName?: string;
    entityNameHumanized?: string;
    entityNameHumanizedPlural?: string;
    frontPath?: string;
    hasWhiteLabel?: boolean;
    hasDateAudit?: boolean;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IBusinessEntity> = {
    id: 0,
};

export default () => <div />;
