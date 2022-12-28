import { IJorneyDegree } from '../../jorneydegree/_base/jorney-degree-model';
import { ITheme } from '../../theme/_base/theme-model';
import { IEssay } from '../../essay/_base/essay-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IEssayPreUpload {
    id?: number;
    typedImage?: string;
    jorneyDegree?: IJorneyDegree;
    theme?: ITheme;
    essay?: IEssay;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IEssayPreUpload> = {
    id: 0,
};

export default () => <div />;
