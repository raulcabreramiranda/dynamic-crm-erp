import IWhiteLabel from './white-label.model';

export default interface IUser {
  id?: any;
  login?: string;
  fullname?: string;
  cellphone?: string;
  email?: string;
  birthDate?: Date;
  ra?: string;
  re?: string;
  clients?: string;
  profiles?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  adminWhiteLabel?: IWhiteLabel;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: '',
  login: '',
  fullname: '',
  cellphone: '',
  email: '',
  re: '',
  ra: '',
  activated: false,
  langKey: '',
  clients: '',
  profiles: '',
  createdBy: '',
  lastModifiedBy: '',
  password: '',
};
