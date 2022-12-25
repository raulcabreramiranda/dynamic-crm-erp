import { IMatrix } from '../../../backend/matrix/_base/matrix-model';
import { ISkillItem } from '../../../backend/skillitem/_base/skill-item-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ISkill {
    id?: number;
    sigla?: string;
    name?: string;
    description?: string;
    areaCompetence?: number;
    color?: string;
    matrix?: IMatrix;
    skillItems?: ISkillItem[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ISkill> = {
    id: 0,
};

export default () => <div />;
