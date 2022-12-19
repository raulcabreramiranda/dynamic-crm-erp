import { Moment } from 'moment';
import IUser from './user.model';

export default interface IWhiteLabel {
  id: number;
  logoContentType?: string;
  logoBase64?: string;
  logo?: any;
  socialReason?: string;
  fantasyName?: string;
  cnpj?: string;
  zipCode?: string;
  street?: string;
  complement?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  regANS?: string;
  regCNES?: string;
  technicalManager?: string;
  technicalManagerNurse?: string;
  inscription?: string;
  councilCode?: string;
  ufCode?: string;
  cboCode?: string;
  createdBy?: IUser;
  createdDate?: Moment;
  lastModifiedBy?: IUser;
  lastModifiedDate?: Moment;
  deletedAt?: Moment;
}

export const defaultValue: Readonly<IWhiteLabel> = { id: 0 };
