import { Dayjs } from 'dayjs';

export interface IAdminAuthority {
    id?: number;
    name?: string;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IAdminAuthority> = {
    id: 0,
};

export default () => <div />;
