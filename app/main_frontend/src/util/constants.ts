export const BASE_IMG_PATH = process.env.NEXT_PUBLIC_BASE_IMG_PATH || 'http://local.node.server:8081/'
//export const BASE_API_VERSION_PATH = process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.NODE_SERVER_API_URL || 'http://local.node.server:8081/'
export const BASE_API_VERSION_PATH = process.env.NEXT_PUBLIC_SERVER_API_URL || 'http://local.node.server:8081/'

export const SERVER_LOGIN_URL = '/login'
export const SERVER_LOGOUT_URL = '/login'

export const NODE_SERVER_ENV = process.env.NEXT_PUBLIC_SERVER_ENV_ENV || 'local'

export const AUTH_TOKEN_KEY = 'healthAuthenticationToken';
export const ERROR_DATA_KEY = 'containerErrorData';
export const USER_DATA_KEY = 'userDataEvo';

export const APP_DATE_FORMAT = 'DD/MM/YYYY HH:mm'
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss'
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY'
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm'
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z'
export const APP_WHOLE_NUMBER_FORMAT = '0,0'
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]'
