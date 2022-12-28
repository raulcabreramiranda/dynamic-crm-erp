import { ISkill } from '../../skill/_base/skill-model';
import { IEssayResult } from '../../essayresult/_base/essay-result-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ISkillItem {
    id?: number;
    order?: number;
    points?: number;
    correctionFeedback?: string;
    correctionSuggestion?: any;
    preCorrectionFeedback?: string;
    preCorrectionSuggestion?: any;
    skill?: ISkill;
    essayResults?: IEssayResult[];
    essayResultsFinal?: IEssayResult[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ISkillItem> = {
    id: 0,
};

export default () => <div />;
