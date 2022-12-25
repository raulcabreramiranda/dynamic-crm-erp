export const URL_CREATE_EXAM_API =
  process.env.NEXT_PUBLIC_ENV_URL_CREATE_EXAM_API ||
  'http://18.228.216.230/create_prova2.php';
export const URL_READ_EXAM_API =
  process.env.NEXT_PUBLIC_ENV_URL_READ_EXAM_API ||
  'http://18.228.216.230/create_prova2.php';
export const URL_CREATE_PDF_TEMPLATE =
  process.env.NEXT_PUBLIC_ENV_URL_CREATE_PDF_TEMPLATE ||
  'https://mobile.mestregr.com.br/create_pdf_template.php';
export const URL_CHECK_GABARITO_TEMPLATE =
  process.env.NEXT_PUBLIC_ENV_URL_CHECK_GABARITO_TEMPLATE ||
  'https://mobile.mestregr.com.br:4443/check-gabarito-template';

export const BASE_IMG_PATH = process.env.NEXT_PUBLIC_BASE_IMG_PATH || '/';
export const BASE_API_VERSION_PATH =
  process.env.NEXT_PUBLIC_SERVER_API_URL ||
  process.env.NODE_SERVER_API_URL ||
  '/';

export const SERVER_LOGIN_URL =
  process.env.NEXT_PUBLIC_SERVER_LOGIN_URL ||
  'https://simulados.evolucional.com.br/entrar?ReturnUrl=%2fpainel123';
export const SERVER_LOGOUT_URL =
  process.env.NEXT_PUBLIC_SERVER_LOGOUT_URL ||
  'https://simulados.evolucional.com.br/sair';

export const SERVER_38_LOGIN_URL =
  process.env.NEXT_PUBLIC_SERVER_38_LOGIN_URL ||
  'https://simulados.evolucional.com.br/entrar?ReturnUrl=%2fpainel123';
export const SERVER_38_LOGOUT_URL =
  process.env.NEXT_PUBLIC_SERVER_38_LOGOUT_URL ||
  'https://simulados.evolucional.com.br/sair';

export const SERVER_39_LOGIN_URL =
  process.env.NEXT_PUBLIC_SERVER_39_LOGIN_URL ||
  'https://simulados.evolucional.com.br/entrar?ReturnUrl=%2fpainel123';
export const SERVER_39_LOGOUT_URL =
  process.env.NEXT_PUBLIC_SERVER_39_LOGOUT_URL ||
  'https://simulados.evolucional.com.br/sair';

export const FOLDER_UPLOAD_CARDS =
  process.env.NEXT_PUBLIC_FOLDER_UPLOAD_CARDS || '003';
export const LINK_ESTIMATE_GRADES =
  process.env.NEXT_PUBLIC_LINK_ESTIMATE_GRADES || null;
export const NODE_SERVER_ENV =
  process.env.NEXT_PUBLIC_SERVER_ENV_ENV || 'production';

// typeof document !== "undefined" && document?.location?.origin
export const MODULE_SELECTED = 'jhiModuleSelected';
export const AUTH_TOKEN_KEY = 'jhiAuthenticationToken';
export const USER_DATA_KEY = 'userDataEvo';
export const THEMES_DATA_KEY = 'themeDataEvo';
export const DEGREE_DATA_KEY = 'degreeDataEvo';
export const JORNEY_DATA_KEY = 'jorneyDataEvo';
export const DISIPLINA_DATA_KEY = 'disiplinaData';
export const ERROR_DATA_KEY = 'containerErrorData';
export const SYSTEM_EVALUATION_DATA_KEY = 'evaluationData';

export const APP_DATE_FORMAT = 'DD/MM/YYYY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const CHECK_TEMPLATE_ANSWERS_GRID_1 = 'respostas_1';
export const CHECK_TEMPLATE_ANSWERS_GRID_2 = 'respostas_2';
export const CHECK_TEMPLATE_ANSWERS_GRID_3 = 'respostas_3';
export const CHECK_TEMPLATE_ANSWERS_GRID_4 = 'respostas_4';
export const CHECK_TEMPLATE_TP = 'gabarito_tp';
export const CHECK_TEMPLATE_USER = 'inscription_number';
export const CHECK_TEMPLATE_USER_QRCODE = 'student_code_qr';

export const THIS_YEAR = '2022';

export const EXAM_CARD_ENEMFIT_DAY1 = 1;
export const EXAM_CARD_ENEMFIT_DAY2 = 2;
export const EXAM_CARD_PROVA = 3;

export const SYSTEM_EVALUATION_RANGE = {
  Bimestre: [
    {
      start: `${THIS_YEAR}-01-01 00:00:00`,
      end: `${THIS_YEAR}-12-31 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-03-01 00:00:00`,
      end: `${THIS_YEAR}-04-30 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-05-01 00:00:00`,
      end: `${THIS_YEAR}-06-30 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-07-01 00:00:00`,
      end: `${THIS_YEAR}-08-31 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-09-01 00:00:00`,
      end: `${THIS_YEAR}-12-31 23:59:59`,
    },
  ],
  Trimestre: [
    {
      start: `${THIS_YEAR}-01-01 00:00:00`,
      end: `${THIS_YEAR}-12-31 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-03-01 00:00:00`,
      end: `${THIS_YEAR}-05-30 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-06-01 00:00:00`,
      end: `${THIS_YEAR}-08-31 23:59:59`,
    },
    {
      start: `${THIS_YEAR}-09-01 00:00:00`,
      end: `${THIS_YEAR}-12-31 23:59:59`,
    },
  ],
};
export const SYSTEM_PLATAFORMS = [
  { id: 2, name: 'evo | enemFIT', module: 'enemfit' },
  { id: 3, name: 'evo | red', module: 'redacao' },
  { id: 5, name: 'evo | provas', module: 'provas' },
];

export const SUPERPRO_QTQUESTOES = {
  textButtom: 'Acessar 170 mil questões agora!',
  info: '170 mil questões de Ensino Fundamental II e Ensino Médio',
};

export const KNOWLEDGE_AREA_START_NUMBER = { 1: 15, 2: 30, 3: 45, 4: 0 };

export const DISIPLINES_MIN_QUETIONS = {
  2: 10, // física,
  3: 10, // geografia
  4: 10, // história,
  5: 30, // matemática
  6: 14, // português
  7: 10, // química
  8: 4, // inglês,
  9: 4, // artes,
  10: 10, // biologia,
  11: 4, // espanhol,
  12: 4, // filosofia,
  14: 4, // linguagem corporal,
  15: 6, // sociologia,
  20: 4, // literatura,
};
