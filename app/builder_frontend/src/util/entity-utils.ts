/* eslint no-console: off */
import {
  AUTH_TOKEN_KEY,
  BASE_API_VERSION_PATH,
  NODE_SERVER_ENV,
  BASE_IMG_PATH,
  ERROR_DATA_KEY,
  USER_DATA_KEY,
} from './constants';
import cookie from 'js-cookie';
import { useRouter as useRouterAux } from 'next/router';
import nextCookieAux from 'next-cookies';
import { AppProps as AppPropsAux } from 'next/app';
import dayjs, { Dayjs } from 'dayjs';
// import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// const MySwal = withReactContent(Swal);

export const INumber: number = 0;
export const IBoolean: boolean = true;
export const IString: string = '';
export const IDayjs: Dayjs = dayjs();


let router: any = {
  push: (path: string) => (document.location.href = path),
};
export const nextCookie = nextCookieAux;

export const useRouter = () => {
  router = useRouterAux();
  return router;
};
export const hasAnyAuthority = (userAccount: any, entity: any, actions: any) => {
   return true
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

// export const showAlert = (
//   title: string,
//   html: string | HTMLElement | JQuery = '',
//   icon: SweetAlertIcon = 'warning',
//   confirmButtonText = 'Aceitar',
//   confirmButtonColor = '#060181'
// ) => {
//   MySwal.fire({
//     title,
//     html,
//     icon: icon,
//     showConfirmButton: true,
//     showCancelButton: false,
//     confirmButtonColor: confirmButtonColor,
//     confirmButtonText: confirmButtonText,
//   });
// };

// export const showQuestion = async (options: Partial<SweetAlertOptions>) => {
//   const result = await MySwal.fire({
//     title: options.title,
//     html: options.html,
//     icon: options.icon || 'question',
//     showConfirmButton: options.showConfirmButton || true,
//     showCancelButton: options.showCancelButton || true,
//     confirmButtonColor: options.confirmButtonColor || '#060181',
//     confirmButtonText: options.confirmButtonText || 'Confirmar',
//     cancelButtonColor: options.cancelButtonColor || 'default',
//     cancelButtonText: options.cancelButtonText || 'Cancelar',
//   });
//   return result.isConfirmed;
// };

export const stringToSlug = (str: string) => {
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

export const getFormFromSelect = (filterValue: any, type: any) => {
  if (!!filterValue && filterValue.constructor === Object) {
    return { ...filterValue, id: filterValue.value };
  } else if (!!filterValue && filterValue.constructor === Array) {
    return filterValue.map((v) => ({ ...v, id: v.value }));
  }
  return ['many-to-many', 'one-to-many'].includes(type) ? [] : null;
};
const testBearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg2OTM3NSwidXNlcm5hbWUiOiJjb29yZGpvckBqb3JuYWRhLmNvbSIsIndoaXRlTGFiZWwiOiIyOTc2NTgiLCJjbGllbnRJZCI6NCwidXNlclR5cGUiOiJDT09SRElOQVRPUiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjY3NjY3NzkyLCJleHAiOjE2Njc2NjgwOTJ9.w4Uy5-XzNulErrpAb1rUsrwhKGmpfsqS-M1rszt-Re8"
export const getListAxios: any = async (
  endpoint: any,
  filters: any,
  page: any,
  size: any,
  sort: any,
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
      Authorization: 'Bearer ' + (cookie.get(AUTH_TOKEN_KEY) || testBearer),
      'Content-Type': 'application/json;charset=utf-8',
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


export type ICookieUser = {
  id: number;
  whiteLabelData?: any[];
  clientId?: number;
  clientData?: any[];
  whiteLabel: string;
  login: string;
  fullname: string;
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

  return {
    id: 0,
    whiteLabel: '',
    login: '',
    fullname: '',
  };
}


export async function logoutFunction() {
  const userLogger = { ...getLoggedUser() };

  cookie.set(AUTH_TOKEN_KEY, '', { expires: 10000 });
  localStorage.setItem(USER_DATA_KEY, '');

}

export interface IApiResponseProps { data?: any; headers?: Headers; userLogged?: any; status?: number }
export interface IApiRequestProps {
  sort?: {};
  size?: number;
  page?: number;
  filters?: {};
  body?: {};
  id?: any;
  selectColumns?: Object;
  userLogged?: any;
  onSuccess?(response: IApiResponseProps): void;
  onError?(response: IApiResponseProps): void;
}

export function apiGetPath() {
  if (NODE_SERVER_ENV === 'production') {
    return '/';
  }
  return BASE_API_VERSION_PATH;
}

export function assestBasePath(imgLink: string) {  
  return trim(BASE_API_VERSION_PATH, '/') + '/' + trim(imgLink, '/');
}

export async function apiGet(endpint: string, options: IApiRequestProps = {}) {
  const sort = options['sort'] ? options['sort'] : { id: 'asc' };
  const size = options['size'] ? options['size'] : 100;
  const page = options['page'] ? options['page'] : 0;

  const filters: any = options['filters'] ? options['filters'] : {};
  const selectColumns = options['selectColumns']
    ? options['selectColumns']
    : {};
  const onSuccess = options['onSuccess']
    ? options['onSuccess']
    : (response: IApiResponseProps) => {};
  const onError = options['onError'] ? options['onError'] : (response: IApiResponseProps) => {};
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
        Authorization: 'Bearer ' + (cookie.get(AUTH_TOKEN_KEY) || testBearer),
        'Content-Type': 'application/json;charset=utf-8',
        'Select-Columns': JSON.stringify(selectColumns),
        'Get-User-Account': getUserLogged,
      },
    }
  );
  const data = await request.json();
  const response: IApiResponseProps = { data, headers: request.headers, status: request.status };
  if (getUserLogged === '1') {
    const userLoggedData = request.headers?.get('user-account-data') || '{}';
    response['userLogged'] = JSON.parse(userLoggedData);
  }
  if (request.status === 200) {
    onSuccess(response);
  } else {
    onError(response);
  }
  return response;
}

export async function apiPost(endpint: string, options: IApiRequestProps = {}) {
  let body = {};
  let onSuccess = (response: IApiResponseProps) => {};
  let onError = (response: IApiResponseProps) => {};
  let getUserLogged = '0';

  if (options['body']) body = options['body'];

  if (options['onSuccess']) onSuccess = options['onSuccess'];

  if (options['onError']) onError = options['onError'];

  if (options['userLogged']) getUserLogged = options['userLogged'];

  const request = await fetch(apiGetPath() + `api/${endpint}`, {
    body: JSON.stringify(body),
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + (cookie.get(AUTH_TOKEN_KEY) || testBearer),
      'Content-Type': 'application/json;charset=utf-8',
      'Get-User-Account': getUserLogged,
    },
  });
  const data = await request.json();
  const response = {
    data: data,
    headers: request.headers,
    status: request.status,
  };
  if (request.status === 201) {
    onSuccess(response);
  } else {
    onError(response);
  }
  return response;
}

export async function apiPut(endpint: string, options: IApiRequestProps = {}) {
  let body = {};
  let onSuccess = (response: IApiResponseProps) => {};
  let onError = (response: IApiResponseProps) => {};
  let getUserLogged = '0';

  if (options['body']) body = options['body'];

  if (options['onSuccess']) onSuccess = options['onSuccess'];

  if (options['onError']) onError = options['onError'];

  if (options['userLogged']) getUserLogged = options['userLogged'];

  const request = await fetch(apiGetPath() + `api/${endpint}`, {
    body: JSON.stringify(body),
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + (cookie.get(AUTH_TOKEN_KEY) || testBearer),
      'Content-Type': 'application/json;charset=utf-8',
      'Get-User-Account': getUserLogged,
    },
  });
  const data = await request.json();
  const response = { data, headers: request.headers, status: request.status };
  if (request.status === 201 || request.status === 200) {
    onSuccess(response);
  } else {
    onError(response);
  }
  return response;
}

export async function apiDelete(endpint: string, options: IApiRequestProps = {}) {
  let id = {};
  let onSuccess = (response: any) => {};
  let onError = (response: any) => {};
  let getUserLogged = '0';

  if (options['id']) id = options['id'];

  if (options['onSuccess']) onSuccess = options['onSuccess'];

  if (options['onError']) onError = options['onError'];

  if (options['userLogged']) getUserLogged = options['userLogged'];

  const resUser = await fetch(apiGetPath() + `api/${endpint}/${id}`, {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + (cookie.get(AUTH_TOKEN_KEY) || testBearer),
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

export function stripTags(htmlString: string) {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]+>/g, '');
}

export function newDayjs(time = null): Dayjs {
  let newTime = dayjs();
  if (time) {
    newTime = dayjs(time);
  }
  if (typeof window !== 'undefined') {
    const _window: any = window;
    const serverDateDiff: any = _window['SERVER_DATE_DIFF'] || 0;
    return newTime.add(serverDateDiff, 'second');
  }
  return newTime;
}

export function newDate(returnDayjs = false): Date {
  return newDayjs().toDate();
}

export function convertSecondToTime(seconds: number, format = 'HH:mm:ss') {
  const _date = newDate();
  _date.setHours(
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    Math.floor(((seconds % 3600) % 60) % 60)
  );

  if (format === null) {
    return _date;
  }
  return dayjs(_date).format(format);
}

export function convertObjectToUri(obj: Array<any>, prefix = ''): string {
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

export function convertUriToObject(query: string) {
  query = query.substring(query.indexOf('?') + 1);

  var re = /([^&=]+)=?([^&]*)/g;
  var decodeRE = /\+/g;

  var decode = function (str:string) {
    return decodeURIComponent(str.replace(decodeRE, ' '));
  };

  var params: any = {},
    e;
  while ((e = re.exec(query))) {
    var k = decode(e[1]),
      v = decode(e[2]);
    if (k.substring(k.length - 2) === '[]') {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(v);
    } else params[k] = v;
  }

  var assign = function (obj: any, keyPath: any, value: any) {
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
      const levels: any = [];
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
