import { IExam } from '../../exam/_base/exam-model';
import { ICerneClass } from '../../class/_base/cerne-class-model';
import { ProductionType } from '../../../../components/enumerations/production-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamConfigureApplication {
    id?: number;
    dateInitial?: string;
    dateFinal?: string;
    productionType?: ProductionType;
    mixingQuestions?: boolean;
    supervise?: boolean;
    limitTime?: number;
    scheduleReleaseResults?: string;
    exam?: IExam;
    cerneClass?: ICerneClass;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamConfigureApplication> = {
    id: 0,
};

export default () => <div />;
