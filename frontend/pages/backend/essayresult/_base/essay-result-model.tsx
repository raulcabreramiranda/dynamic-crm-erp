import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IEssay } from '../../../backend/essay/_base/essay-model';
import { ISkillItem } from '../../../backend/skillitem/_base/skill-item-model';
import { IEssayResultComment } from '../../../backend/essaycomment/_base/essay-result-comment-model';
import { IMatrixAnnulmentReason } from '../../../backend/matrixAnnulmentReason/_base/matrix-annulment-reason-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IEssayResult {
    id?: number;
    bloqued?: boolean;
    dateInitial?: string;
    dateFinal?: string;
    delivered?: boolean;
    isPreReview?: boolean;
    scoreFinal?: number;
    finalComment?: any;
    reviewer?: IAdminUser;
    essay?: IEssay;
    skillItem?: ISkillItem;
    essayResultComment?: IEssayResultComment[];
    skillItemFinal?: ISkillItem;
    matrixAnnulmentReason?: IMatrixAnnulmentReason;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IEssayResult> = {
    id: 0,
};

export default () => <div />;
