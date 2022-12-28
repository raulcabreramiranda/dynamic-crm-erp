import { SystemEvaluation } from '../../../../components/enumerations/system-evaluation.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ICerneSchool {
    id?: number;
    name?: string;
    systemEvaluation?: SystemEvaluation;
    deliveryProof?: number;
    printingProof?: number;
    uploadReplyCard?: number;
    date?: string;
    imageContentType?: string;
    imageBase64?: string;
    imageFileName?: string;
    image?: any;
    correctionEssayQuestions?: number;
    releaseResults?: number;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ICerneSchool> = {
    id: 0,
};

export default () => <div />;
