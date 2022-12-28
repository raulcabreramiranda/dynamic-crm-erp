import { IEssay } from '../../essay/_base/essay-model';
import { ICerneClass } from '../../class/_base/cerne-class-model';
import { ITheme } from '../../theme/_base/theme-model';
import { IConfigureCorrectionReviewer } from '../../configurecorrectionreviewer/_base/configure-correction-reviewer-model';
import { IJorneyDegree } from '../../jorneydegree/_base/jorney-degree-model';
import { ConfigureCorrectionOptions } from '../../../../components/enumerations/configure-correction-options.model';
import { ConfigureCorrectionIa } from '../../../../components/enumerations/configure-correction-ia.model';
import { NotesReturnConfigure } from '../../../../components/enumerations/notes-return-configure.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IConfigureCorrection {
    id?: number;
    name?: string;
    configureCorrectionOptions?: ConfigureCorrectionOptions;
    configureCorrectionIa?: ConfigureCorrectionIa;
    notesReturnConfigure?: NotesReturnConfigure;
    notesReturnMinimumDate?: string;
    essays?: IEssay[];
    cerneClass?: ICerneClass;
    theme?: ITheme;
    configureCorrectionReviewers?: IConfigureCorrectionReviewer[];
    jorneyDegree?: IJorneyDegree;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IConfigureCorrection> = {
    id: 0,
};

export default () => <div />;
