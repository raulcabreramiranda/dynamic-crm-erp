import { TypeContent } from '../../../components/enumerations/type-content.model';
import { Dayjs } from 'dayjs';

export interface IPhoto {
    id?: number;
    description?: any;
    title?: string;
    hour?: string;
    linkContentType?: string;
    linkBase64?: string;
    linkFileName?: string;
    link?: any;
    typeContent?: TypeContent;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IPhoto> = {
    id: 0,
};

export default () => <div />;
