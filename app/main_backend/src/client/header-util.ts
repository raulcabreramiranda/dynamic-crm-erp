import { Response } from 'express';
// import { Page } from '../domain/base/pagination.entity';

const applicationName = 'jhipster.clientApp.name';
const enableTranslation = true;

export class HeaderUtil {
  static createAlert(res: Response, message: string, param: string): any {
    res.set('X-' + applicationName + '-alert', message);
    res.set('X-' + applicationName + '-params', param);
  }

  static addEntityCreatedHeaders(res: Response, entityName: any, param: any): any {
    res.status(201);
    const message = enableTranslation ? applicationName + '.' + entityName + '.created' : 'A new ' + entityName + ' is created with identifier ' + param;
    this.createAlert(res, message, param);
  }

  static addEntityUpdatedHeaders(res: Response, entityName: any, param: any): any {
    const message = enableTranslation ? applicationName + '.' + entityName + '.updated' : 'A ' + entityName + ' is updated with identifier ' + param;
    this.createAlert(res, message, param);
  }

  static addEntityDeletedHeaders(res: Response, entityName: any, param: any): any {
    res.status(204);
    const message = enableTranslation ? applicationName + '.' + entityName + '.deleted' : 'A ' + entityName + ' is deleted with identifier ' + param;
    this.createAlert(res, message, param);
  }

  static addPaginationHeaders(res: Response, page: any): any {
    const url = res.req.url;
    res.set('X-Total-Count', page.total.toString());
    res.set('Content-Type', 'application/json; charset=utf-8; total=789');
    const pageNumber = page.pageable.page;
    const pageSize = page.pageable.size;
    const links = [];
    if (pageNumber < page.total - 1) {
      links.push(this.prepareLink(url, pageNumber + 1, pageSize, 'next'));
    }
    if (pageNumber > 0) {
      links.push(this.prepareLink(url, pageNumber - 1, pageSize, 'prev'));
    }
    links.push(this.prepareLink(url, page.total - 1, pageSize, 'last'));
    links.push(this.prepareLink(url, 0, pageSize, 'first'));
    res.set('Link', links.join('%2C'));
  }

  static addGlobalHeaders(res: Response, userLoggedData: string): any {
    res.set('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Range, Accept-Range, X-Total-Count, User-Account-Data');
    res.set('User-Account-Data', userLoggedData);
  }

  private static prepareLink(url: any, pageNumber: any, pageSize: any, relType: any): any {
    url = new URL('http://localhost' + url);
    url.searchParams.set('page', pageNumber);
    url.searchParams.set('size', pageSize);
    url = url.toString().replace('http://localhost', '');
    return `<${url}>%3B rel="${relType}"`;
  }
}
