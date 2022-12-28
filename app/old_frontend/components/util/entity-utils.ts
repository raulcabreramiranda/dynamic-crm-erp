/* eslint no-console: off */
import {
  AUTH_TOKEN_KEY,
  BASE_API_VERSION_PATH,
  JORNEY_DATA_KEY,
  DEGREE_DATA_KEY,
  THEMES_DATA_KEY,
  USER_DATA_KEY,
  URL_CREATE_EXAM_API,
  DISIPLINA_DATA_KEY,
  SYSTEM_EVALUATION_DATA_KEY,
  SYSTEM_PLATAFORMS,
  THIS_YEAR,
  URL_READ_EXAM_API,
  ERROR_DATA_KEY,
  SERVER_LOGIN_URL,
  SERVER_LOGOUT_URL,
  SERVER_38_LOGOUT_URL,
  SERVER_39_LOGOUT_URL,
  SERVER_39_LOGIN_URL,
  SERVER_38_LOGIN_URL,
  EXAM_CARD_ENEMFIT_DAY1,
  EXAM_CARD_ENEMFIT_DAY2,
  EXAM_CARD_PROVA,
  NODE_SERVER_ENV,
  BASE_IMG_PATH,
} from './constants';
import cookie from 'js-cookie';
import { useRouter as useRouterAux } from 'next/router';
import nextCookieAux from 'next-cookies';
import { GetServerSideProps as GetServerSidePropsAux } from 'next';
import { AppProps as AppPropsAux } from 'next/app';
import moment, { Moment } from 'moment';
import { UserType } from '../../components copy/enumerations/user-type.model';
import { ICerneClass } from '../../pages/backend/class/_base/cerne-class-model';
import { ICernePlataform } from '../../pages/backend/cerneplataform/_base/cerne-plataform-model';
import { ICerneSchool } from '../../pages/backend/school/_base/cerne-school-model';
import { IExam } from '../../pages/backend/exam/_base/exam-model';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import he from 'he';
import { getAlternativeCode, getAlternativeLetter } from './gabarito-utils';

export const INumber: number = 0;
export const IBoolean: boolean = true;
export const IString: string = '';
export const IMoment: Moment = moment();

const MySwal = withReactContent(Swal);

let router: any = {
  push: (path: string) => (document.location.href = path),
};
export const nextCookie = nextCookieAux;
export type GetServerSideProps = GetServerSidePropsAux;
export type AppProps = AppPropsAux;

export const useRouter = () => {
  router = useRouterAux();
  return router;
};

export const removeAllArrayItem = (arr: any, value: any) => {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
};

export const getFilterFromSelect = (filterValue: any, type?: any) => {
  if (!filterValue) {
    return '';
  } else if (!!filterValue && filterValue.constructor === Object) {
    return filterValue.value;
  } else if (!!filterValue && filterValue.constructor === Array) {
    return filterValue.map((v) => v.value).join(',');
  }
  return '';
};

export const getValueRecursive: any = (
  entity: any,
  fieldPath: any,
  returnOnNull = null,
  returnJoin = ', '
) => {
  const field = fieldPath.slice(0, 1).pop();

  if (!entity) return returnOnNull;
  if (!fieldPath) return returnOnNull;
  if (fieldPath.length === 0) return returnOnNull;

  if (Array.isArray(entity)) {
    if (fieldPath.length === 1) {
      const _result = entity.map((enti) => enti[field]).join(returnJoin);
      return _result;
    }

    const _result1: any = entity
      .map((enti) => {
        return getValueRecursive(
          enti[field],
          fieldPath.slice(1),
          returnOnNull,
          returnJoin
        );
      })
      .join(', ');
    return _result1;
  } else {
    if (fieldPath.length === 1) {
      const result = entity && entity[field] ? entity[field] : returnOnNull;
      return result;
    }
    return entity[field]
      ? getValueRecursive(
          entity[field],
          fieldPath.slice(1),
          returnOnNull,
          returnJoin
        )
      : returnOnNull;
  }
};

export const jsonParse = (raw: any, returnObject = true) => {
  try {
    return JSON.parse(raw);
  } catch (err) {
    if (returnObject) {
      return {};
    }
    return [];
  }
};

export const showAlert = (
  title: string,
  html: string | HTMLElement | JQuery = '',
  icon: SweetAlertIcon = 'warning',
  confirmButtonText = 'Aceitar',
  confirmButtonColor = '#060181'
) => {
  MySwal.fire({
    title,
    html,
    icon: icon,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonColor: confirmButtonColor,
    confirmButtonText: confirmButtonText,
  });
};

export const showQuestion = async (options: Partial<SweetAlertOptions>) => {
  const result = await MySwal.fire({
    title: options.title,
    html: options.html,
    icon: options.icon || 'question',
    showConfirmButton: options.showConfirmButton || true,
    showCancelButton: options.showCancelButton || true,
    confirmButtonColor: options.confirmButtonColor || '#060181',
    confirmButtonText: options.confirmButtonText || 'Confirmar',
    cancelButtonColor: options.cancelButtonColor || 'default',
    cancelButtonText: options.cancelButtonText || 'Cancelar',
  });
  return result.isConfirmed;
};

export const stringToSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export const reloadPreView = async (
  data,
  format = 'pdf',
  onFinish = (_urlPdf) => {}
) => {
  const header = (textHeader, _questionEntity) => {
    let text = '';

    if (data?.dayApplication > 0) {
      text += textHeader;

      if (data.dayApplication == 1) {
        if (
          _questionEntity?.questionNumber == 1 &&
          _questionEntity?.['discipline'].shortName == 'ING'
        ) {
          text +=
            '<b>Quest&otilde;es de 01 a 02 (op&ccedil;&atilde;o ingl&ecirc;s)</b>';
        } else if (
          _questionEntity?.questionNumber == 1 &&
          _questionEntity?.['discipline'].shortName == 'ESP'
        ) {
          text +=
            '<b>Quest&otilde;es de 01 a 02 (op&ccedil;&atilde;o espanhol)</b>';
        }
      }
      text += '<br>';
    }

    return text;
  };

  const userLogged = getLoggedUser();
  const logo = userLogged.cerneSchool.image
    ? baseApiPath(userLogged.cerneSchool.image)
    : data.logo;

  let textHeader = '';
  let qtdQuestoes = 0;

  let nrQuestionInit = 1;

  if (data.dayApplication == 1) nrQuestionInit = 1;
  else if (data.dayApplication == 2) nrQuestionInit = 31;

  let body = {
    format: format,
    template: 'evo-2cols',
    students: [[{}]],
    data: {
      logoUrl:
        'https://sis.mestregr.com.br/templates/cartoes/003/02/02/logo_evo.jpg',
      headerBig: '',
      headerImgCapa: data.headerImgCapa,
      headerSmall: '',
      aditionalInfo: {
        subject: '', //he.encode(data.subject, {'allowUnsafeSymbols': true}),
        description: '', //he.encode(data.description, {'allowUnsafeSymbols': true}),
        instructions: '', //he.encode(data.instructions, {'allowUnsafeSymbols': true}),
      },
    },
    questions: data.questions
      .filter((_questionEntity, j) => _questionEntity?.enunciationText)
      .map((_questionEntity, j) => {
        let textHeaderInfo: any = '';
        let questionText: any = '';

        if (data.dayApplication > 0) {
          if (_questionEntity?.['areaCompetence'].shortName != textHeader) {
            if (data.dayApplication == 1) {
              qtdQuestoes = data.questions.filter(
                (q: any) =>
                  q?.['areaCompetence'].shortName ==
                  _questionEntity?.['areaCompetence'].shortName
              ).length;

              if (nrQuestionInit == 1) qtdQuestoes += nrQuestionInit - 3;
              else qtdQuestoes += nrQuestionInit - 1;
            } else if (data.dayApplication == 2) {
              qtdQuestoes = data.questions.filter(
                (q: any) =>
                  q?.['areaCompetence'].shortName ==
                  _questionEntity?.['areaCompetence'].shortName
              ).length;
              qtdQuestoes += nrQuestionInit - 1;
            } else qtdQuestoes = data.questions.length;

            textHeader = _questionEntity?.['areaCompetence'].shortName;
            textHeaderInfo =
              '<b>' +
              he.encode(
                _questionEntity?.['areaCompetence'].name
                  ?.toString()
                  ?.toUpperCase() || 'noarea',
                { allowUnsafeSymbols: true }
              ) +
              '</b><br><b>Quest&otilde;es de ' +
              nrQuestionInit +
              ' a ' +
              qtdQuestoes +
              '</b><br>';

            nrQuestionInit = qtdQuestoes + 1;
          } else if (
            data.dayApplication == 1 &&
            _questionEntity?.questionNumber == 3
          ) {
            textHeaderInfo =
              '<b>' +
              he.encode(
                (_questionEntity?.['areaCompetence'].name)
                  .toString()
                  .toUpperCase(),
                {
                  allowUnsafeSymbols: true,
                }
              ) +
              '</b><br><b>Quest&otilde;es de 03 a ' +
              qtdQuestoes +
              '</b><br>';
          }
          questionText =
            '<div custom-style="HeaderArea">' +
            header(textHeaderInfo, _questionEntity) +
            '</div><b>Quest&atilde;o&nbsp;' +
            _questionEntity?.questionNumber +
            '</b>&nbsp;<img width="260" height="11" style="padding-top: 25px" src="https://provas.evolucional.com.br/assets/evofit/quebra-questao.png"><br>' +
            (he.encode(_questionEntity?.enunciationText, {
              allowUnsafeSymbols: true,
            }) || '');
        } else {
          textHeaderInfo = '';
          questionText =
            '<b>Quest&atilde;o&nbsp;' +
            _questionEntity?.questionNumber +
            '</b><br>' +
            (he.encode(_questionEntity?.enunciationText, {
              allowUnsafeSymbols: true,
            }) || '');
        }

        return {
          dualColumn: data.dualColumn,
          question: questionText,
          responses:
            _questionEntity?.questionAlternative &&
            _questionEntity.questionAlternative.map
              ? _questionEntity?.questionAlternative.map(
                  (v: any, i: number) =>
                    getAlternativeCode(v.position) +
                    '&nbsp;' +
                    he.encode(v.description, { allowUnsafeSymbols: true })
                )
              : [],
        };
      }),
  };

  const res = await fetch(URL_CREATE_EXAM_API, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {},
  });

  const _urlPdf = await res.json();
  onFinish(`${URL_READ_EXAM_API}${trim(_urlPdf['url'], '/')}`);
};

export const getFormFromSelect = (filterValue: any, type: any) => {
  if (!!filterValue && filterValue.constructor === Object) {
    return { ...filterValue, id: filterValue.value };
  } else if (!!filterValue && filterValue.constructor === Array) {
    return filterValue.map((v) => ({ ...v, id: v.value }));
  }
  return ['many-to-many', 'one-to-many'].includes(type) ? [] : null;
};

export const getListAxios: any = async (
  endpoint: any,
  filters: any,
  page: any,
  size: any,
  sort: any,
  selectFields = '',
  selectColumns = {}
) => {
  filters['page'] = page;
  filters['size'] = size;
  filters['sort'] = sort;
  const filtersQuery = Object.keys(filters).reduce(function (str, key, i) {
    const delimiter = i === 0 ? '?' : '&';
    key = encodeURIComponent(key);
    const val = encodeURIComponent(filters[key]);
    return [str, delimiter, key, '=', val].join('');
  }, '');

  const res = await fetch(apiGetPath() + 'api/' + endpoint + filtersQuery, {
    headers: {
      Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
      'Content-Type': 'application/json;charset=utf-8',
      'Select-Fields': selectFields,
      'Select-Columns': JSON.stringify(selectColumns),
    },
  });

  return res ? res.json() : [];
};
export const showFieldsSelectAsync = (
  entity: any,
  fields: any,
  returnJoin: any = ', '
) => {
  if (returnJoin !== false && returnJoin !== null) {
    return fields
      .split(';')
      .map((field: any) => {
        const _result = getValueRecursive(entity, field.split('.'), null);
        return _result;
      })
      .join(returnJoin);
  } else if (returnJoin === null) {
    const _arrayResult = fields.split(';').map((field: any) => {
      const _result = getValueRecursive(entity, field.split('.'), null);
      return _result;
    });
    if (Array.isArray(_arrayResult)) {
      return _arrayResult && _arrayResult.length > 0 && _arrayResult[0]
        ? (_arrayResult[0] + '').split(', ')
        : [];
    }
    return _arrayResult ? [_arrayResult] : [];
  }
  return fields
    .split(';')
    .map((field: any) => {
      const _result = getValueRecursive(entity, field.split('.'), null);
      return _result;
    })
    .pop();
};

export const sleepFunction = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const checkAnyValueFields = (
  entity: any,
  fields: any,
  value: any,
  equals = true
) => {
  const values = showFieldsSelectAsync(entity, fields, '*+*+*');
  if (values) {
    return equals === values.split('*+*+*').includes(value + '');
  }
  return false;
};

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with empty an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const viacepRequest = (cep: any, fn: any) => {
  fetch('https://viacep.com.br/ws/' + cep + '/json/')
    .then((res) => res.json())
    .then(
      (result) => {
        fn({
          cepRequestBairro: result.bairro ? result.bairro : '',
          cepRequestCep: result.cep ? result.cep : '',
          cepRequestComplemento: result.complemento ? result.complemento : '',
          cepRequestGia: result.gia ? result.gia : '',
          cepRequestIbge: result.ibge ? result.ibge : '',
          cepRequestLocalidade: result.localidade ? result.localidade : '',
          cepRequestLogradouro: result.logradouro ? result.logradouro : '',
          cepRequestUf: result.uf ? result.uf : '',
          cepRequestUnidade: result.unidade ? result.unidade : '',
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        //  this.setState({
        //    isLoaded: true,
        //    error
        //  });
      }
    );
};

/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
export const mapIdList = (idList: ReadonlyArray<any>) =>
  idList
    .filter((entityId: any) => entityId !== '')
    .map((entityId: any) => ({ id: entityId }));

export const overridePaginationStateWithQueryParams = (
  paginationBaseState: any,
  locationSearch: string
) => {
  const params = new URLSearchParams(locationSearch);
  const page = params.get('page');
  const sort = params.get('sort');
  if (page && sort) {
    const sortSplit = sort.split(',');
    paginationBaseState.activePage = +page;
    paginationBaseState.sort = sortSplit[0];
    paginationBaseState.order = sortSplit[1];
  }
  return paginationBaseState;
};

export const quillEditorModules = {
  formula: true,
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
    ['formula'],
  ],
  clipboard: {
    matchVisual: false,
  },
};
export const quillEditorModulesLimpo = {
  formula: true,
  toolbar: false,
  clipboard: {
    matchVisual: false,
  },
};

export const quillEditorFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export const prettifyXml = (sourceXml: any) => {
  const xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
  const xsltDoc = new DOMParser().parseFromString(
    [
      // describes how we want to modify the XML - indent everything
      '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      '  <xsl:strip-space elements="*"/>',
      '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
      '    <xsl:value-of select="normalize-space(.)"/>',
      '  </xsl:template>',
      '  <xsl:template match="node()|@*">',
      '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      '  </xsl:template>',
      '  <xsl:output indent="yes"/>',
      '</xsl:stylesheet>',
    ].join('\n'),
    'application/xml'
  );

  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  const resultXml = new XMLSerializer().serializeToString(resultDoc);
  return resultXml;
};

export const trim = (s: string, c: string) => {
  if (!s) return s;
  if (c === ']') c = '\\]';
  if (c === '^') c = '\\^';
  if (c === '\\') c = '\\\\';
  return s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
};

export const baseApiPath = (s: string) => {
  return trim(BASE_IMG_PATH, '/') + '/' + trim(s || '', '/');
};

export const selectTheme = (data: any = undefined) => {
  if (typeof localStorage === 'undefined') return {};

  if (data !== undefined) {
    return localStorage.setItem(THEMES_DATA_KEY, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(THEMES_DATA_KEY) || '{}');
};

export const createBreadcrumbEnemFit = (master?, view?) => {
  const degree = selectDegree();
  return [master, degree.name, view];
};

export const createBreadcrumbExam = () => {
  const discipline = selectDiscipline();
  const degree = selectDegree();
  const systemEvaluation = selectSystemEvaluation();
  return [discipline.name, degree.name, systemEvaluation];
};

export const selectSystemEvaluation = (data: any = undefined) => {
  if (typeof localStorage === 'undefined') return null;

  if (data !== undefined) {
    localStorage.setItem(SYSTEM_EVALUATION_DATA_KEY, data);
  }
  return localStorage.getItem(SYSTEM_EVALUATION_DATA_KEY) || null;
};

export const selectDiscipline = (data: any = undefined) => {
  if (typeof localStorage === 'undefined') return {};

  if (data !== undefined) {
    return localStorage.setItem(
      DISIPLINA_DATA_KEY,
      JSON.stringify({
        id: data.id,
        name: data.name,
        code: data.code,
        sigla: data.sigla,
      })
    );
  }
  return JSON.parse(localStorage.getItem(DISIPLINA_DATA_KEY) || '{}');
};

export const containerError = (message: any = undefined, type = 'danger') => {
  if (typeof localStorage === 'undefined') return {};

  if (message !== undefined) {
    return localStorage.setItem(
      ERROR_DATA_KEY,
      JSON.stringify({ type, message })
    );
  }
  return JSON.parse(
    localStorage.getItem(ERROR_DATA_KEY) || '{"type":"danger","message":""}'
  );
};

export const containerErrorClear = () => {
  if (typeof localStorage === 'undefined') return {};
  localStorage.setItem(
    ERROR_DATA_KEY,
    JSON.stringify({ type: '', message: '' })
  );

  const loggedUser = getLoggedUser();
  // if(loggedUser.whiteLabelData.length > 0){
  //     localStorage.setItem(ERROR_DATA_KEY, JSON.stringify({ type: "warning", message: "Seu acesso ainda não foi liberado. Entre mais tarde." }));
  // }
};

export const selectDegree = (data: any = undefined) => {
  if (typeof localStorage === 'undefined') return {};

  if (data !== undefined) {
    return localStorage.setItem(
      DEGREE_DATA_KEY,
      JSON.stringify({ id: data.id, name: data.name })
    );
  }
  return JSON.parse(localStorage.getItem(DEGREE_DATA_KEY) || '{}');
};

export const selectClient = () => {
  const loggedUser = getLoggedUser();
  const clientData = {
    ...loggedUser['clientData'],
    image: `/assets/img/c_${loggedUser['clientId']}_logo.png`,
    imageHeader: `/assets/img/c_${loggedUser['clientId']}_logo-aberto.png`,
  };
  return clientData;
};

export const selectJorney = (data: any = undefined) => {
  if (typeof localStorage === 'undefined') return {};

  if (data !== undefined) {
    return localStorage.setItem(JORNEY_DATA_KEY, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(JORNEY_DATA_KEY) || '{}');
};

export type ICookieUser = {
  id: number;
  whiteLabelData?: any[];
  clientId?: number;
  clientData?: any[];
  whiteLabel: string;
  login: string;
  fullname: string;
  userType: UserType;
  cerneSchool: ICerneSchool;
  cerneClass: ICerneClass;
  cernePlataformUser: ICernePlataform[];
};

export function getLoggedUser(): ICookieUser {
  let userLogger = null;
  try {
    userLogger = JSON.parse(
      localStorage.getItem(USER_DATA_KEY) ||
        `{"login": "", "fullname": "", "userType": ""}`
    );
  } catch (error) {}
  if (userLogger) return userLogger;

  if (typeof document !== 'undefined') {
    if (userLogger.clientId === 38) {
      router.push(SERVER_38_LOGIN_URL);
    } else if (userLogger.clientId === 39) {
      router.push(SERVER_39_LOGIN_URL);
    } else {
      router.push(SERVER_LOGIN_URL);
    }
  }
  return {
    id: 0,
    whiteLabel: '',
    login: '',
    fullname: '',
    userType: UserType.STUDENT,
    cerneSchool: { id: 1 },
    cerneClass: { id: 1 },
    cernePlataformUser: [],
  };
}

export const getPlataformId = () => {
  let plataformId = 3;
  SYSTEM_PLATAFORMS.forEach((element) => {
    if (element.module === getPlataformModule()) {
      plataformId = element.id;
    }
  });
  return plataformId;
};

export const getActualYear = () => {
  return THIS_YEAR;
};

export const getPlataformName = () => {
  let plataformName = '';
  SYSTEM_PLATAFORMS.forEach((element) => {
    if (element.module === getPlataformModule()) {
      plataformName = element.name;
    }
  });
  return plataformName;
};

export const getPlataformModule = () => {
  const module = trim(router.pathname, '/').split('/')[0];
  return module;
};

export const getExamCardScan = (exam: IExam) => {
  const plataform = getPlataformModule();

  if (exam && plataform == 'enemfit')
    return exam.dayApplication === 1
      ? EXAM_CARD_ENEMFIT_DAY1
      : EXAM_CARD_ENEMFIT_DAY2;
  else return EXAM_CARD_PROVA;
};

export async function loginFunction(
  jwt: string,
  userlogged: Object,
  module?: string
) {
  selectJorney({});
  selectTheme({});

  cookie.set(AUTH_TOKEN_KEY, jwt, { expires: 10000 });
  localStorage.setItem(USER_DATA_KEY, JSON.stringify({ ...userlogged }));

  router.push(`/${module ? module : 'redacao'}`);
}

export async function logoutFunction() {
  const userLogger = { ...getLoggedUser() };

  cookie.set(AUTH_TOKEN_KEY, '', { expires: 10000 });
  localStorage.setItem(USER_DATA_KEY, '');

  console.info({ clientId: +userLogger.clientId });
  if (+userLogger.clientId === 38) {
    console.info({ SERVER_38_LOGOUT_URL });
    document.location.href = SERVER_38_LOGOUT_URL;
  } else if (+userLogger.clientId === 39) {
    console.info({ SERVER_39_LOGOUT_URL });
    document.location.href = SERVER_39_LOGOUT_URL;
  } else {
    console.info({ SERVER_LOGOUT_URL });
    document.location.href = SERVER_LOGOUT_URL;
  }
}

export interface IApiRequestProps {
  sort?: {};
  size?: number;
  page?: number;
  filters?: {};
  body?: {};
  id?: any;
  selectFields?: string[];
  selectColumns?: Object;
  userLogged?: boolean;
  onSuccess?(replay: { data?: any; headers?: Headers; userLogged?: any }): void;
  onError?(replay: any): void;
}

export function apiGetPath() {
  if (NODE_SERVER_ENV === 'production') {
    return '/';
  }
  return BASE_API_VERSION_PATH;
}

export async function apiGet(endpint, options: IApiRequestProps = {}) {
  const sort = options['sort'] ? options['sort'] : { id: 'asc' };
  const size = options['size'] ? options['size'] : 100;
  const page = options['page'] ? options['page'] : 0;

  const filters = options['filters'] ? options['filters'] : {};
  const selectFields = options['selectFields'] ? options['selectFields'] : [];
  const selectColumns = options['selectColumns']
    ? options['selectColumns']
    : {};
  const onSuccess = options['onSuccess']
    ? options['onSuccess']
    : (replay) => {};
  const onError = options['onError'] ? options['onError'] : (replay) => {};
  const getUserLogged =
    options['userLogged'] && options['userLogged'] === true ? '1' : '0';

  const _sort = Object.keys(sort)[0] + ',' + Object.values(sort)[0];

  const request = await fetch(
    apiGetPath() +
      `api/${endpint}?${convertObjectToUri(
        filters
      )}&page=${page}&size=${size}&sort=${_sort}`,
    {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
        'Content-Type': 'application/json;charset=utf-8',
        'Select-Fields': selectFields.join(','),
        'Select-Columns': JSON.stringify(selectColumns),
        'Get-User-Account': getUserLogged,
      },
    }
  );
  const data = await request.json();
  const replay = { data, headers: request.headers, status: request.status };
  if (getUserLogged === '1') {
    const userLoggedData = request.headers?.get('user-account-data') || '{}';
    replay['userLogged'] = JSON.parse(userLoggedData);
  }
  if (request.status === 200) {
    onSuccess(replay);
  } else {
    onError(replay);
  }
  return replay;
}

export async function apiPost(endpint, options: IApiRequestProps = {}) {
  let body = {};
  let onSuccess = (replay) => {};
  let onError = (replay) => {};
  let getUserLogged = '0';

  if (options['body']) body = options['body'];

  if (options['onSuccess']) onSuccess = options['onSuccess'];

  if (options['onError']) onError = options['onError'];

  if (options['getUserLogged']) getUserLogged = options['getUserLogged'];

  const request = await fetch(apiGetPath() + `api/${endpint}`, {
    body: JSON.stringify(body),
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
      'Content-Type': 'application/json;charset=utf-8',
      'Get-User-Account': getUserLogged,
    },
  });
  const data = await request.json();
  const replay = {
    data: data,
    headers: request.headers,
    status: request.status,
  };
  if (request.status === 201) {
    onSuccess(replay);
  } else {
    onError(replay);
  }
  return replay;
}

export async function apiPut(endpint, options: IApiRequestProps = {}) {
  let body = {};
  let onSuccess = (replay) => {};
  let onError = (replay) => {};
  let getUserLogged = '0';

  if (options['body']) body = options['body'];

  if (options['onSuccess']) onSuccess = options['onSuccess'];

  if (options['onError']) onError = options['onError'];

  if (options['getUserLogged']) getUserLogged = options['getUserLogged'];

  const request = await fetch(apiGetPath() + `api/${endpint}`, {
    body: JSON.stringify(body),
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
      'Content-Type': 'application/json;charset=utf-8',
      'Get-User-Account': getUserLogged,
    },
  });
  const data = await request.json();
  const replay = { data, headers: request.headers, status: request.status };
  if (request.status === 201 || request.status === 200) {
    onSuccess(replay);
  } else {
    onError(replay);
  }
  return replay;
}

export async function apiDelete(endpint, options: IApiRequestProps = {}) {
  let id = {};
  let onSuccess = (replay) => {};
  let onError = (replay) => {};
  let getUserLogged = '0';

  if (options['id']) id = options['id'];

  if (options['onSuccess']) onSuccess = options['onSuccess'];

  if (options['onError']) onError = options['onError'];

  if (options['getUserLogged']) getUserLogged = options['getUserLogged'];

  const resUser = await fetch(apiGetPath() + `api/${endpint}/${id}`, {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
      'Content-Type': 'application/json;charset=utf-8',
      'Get-User-Account': getUserLogged,
    },
  });

  if (resUser.status === 204) {
    onSuccess(resUser);
    return true;
  } else {
    onError(resUser);
    return false;
  }
}

export function stripTags(htmlString) {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]+>/g, '');
}

export function newMoment(time = null): Moment {
  let newTime = moment();
  if (time) {
    newTime = moment(time);
  }
  if (typeof window !== 'undefined') {
    return newTime.add(window['SERVER_DATE_DIFF'], 'second');
  }
  return newTime;
}

export function newDate(returnMoment = false): Date {
  return newMoment().toDate();
}

export function convertSecondToTime(seconds, format = 'HH:mm:ss') {
  const _date = newDate();
  _date.setHours(
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    Math.floor(((seconds % 3600) % 60) % 60)
  );

  if (format === null) {
    return _date;
  }
  return moment(_date).format(format);
}

export function convertObjectToUri(obj, prefix = '') {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? convertObjectToUri(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
}

export function convertUriToObject(query) {
  query = query.substring(query.indexOf('?') + 1);

  var re = /([^&=]+)=?([^&]*)/g;
  var decodeRE = /\+/g;

  var decode = function (str) {
    return decodeURIComponent(str.replace(decodeRE, ' '));
  };

  var params = {},
    e;
  while ((e = re.exec(query))) {
    var k = decode(e[1]),
      v = decode(e[2]);
    if (k.substring(k.length - 2) === '[]') {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(v);
    } else params[k] = v;
  }

  var assign = function (obj, keyPath, value) {
    var lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      var key = keyPath[i];
      if (!(key in obj)) obj[key] = {};
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  for (var prop in params) {
    var structure = prop.split('[');
    if (structure.length > 1) {
      var levels = [];
      structure.forEach(function (item, i) {
        var key = item.replace(/[?[\]\\ ]/g, '');
        levels.push(key);
      });
      assign(params, levels, params[prop]);
      delete params[prop];
    }
  }
  return params;
}
