import { PhotoTypeContent } from 'src/components/enumerations/photo-type-content.model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathPhoto = 'photos';
export interface IPhoto {
    id?: number;
    description?: any;
    title?: string;
    hour?: string;
    linkContentType?: string;
    linkBase64?: string;
    linkFileName?: string;
    link?: any;
    typeContent?: PhotoTypeContent;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IPhotoFilter {
    id?: IFilter<number>;
    description?: IFilter<any>;
    title?: IFilter<string>;
    hour?: IFilter<string>;
    linkContentType?: string;
    linkBase64?: string;
    linkFileName?: string;
    link?: IFilter<any>;
    typeContent?: IFilter<PhotoTypeContent>;
}

export interface IPhotoFilters extends IPhotoFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IPhoto> = {
    id: 0,
};

export default () => <div />;
