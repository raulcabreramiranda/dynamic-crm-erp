import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const req: Request = context.switchToHttp().getRequest();
    if (req.headers['select-fields']) {
      return req.url + '_' + require('crypto').createHash('md5').update(req.headers['select-fields']).digest('hex');
    }
    return req.url;
  }
}
