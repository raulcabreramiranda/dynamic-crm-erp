import { ITheme } from '../../theme/_base/theme-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IThemePdf {
    id?: number;
    linkProposal?: string;
    linkManual?: string;
    theme?: ITheme;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IThemePdf> = {
    id: 0,
};

export default () => <div />;
