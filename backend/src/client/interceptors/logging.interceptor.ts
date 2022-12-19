import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { createLog } from '../../utilsFunctions';
import { Request } from 'express';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req: Request | any = context.switchToHttp().getRequest();
    const ipInfo = req.ip;
    const userLogin = context.switchToHttp().getRequest() && context.switchToHttp().getRequest().user ? context.switchToHttp().getRequest().user['login'] : '';
    const userId = context.switchToHttp().getRequest() && context.switchToHttp().getRequest().user ? context.switchToHttp().getRequest().user['id'] : '';
    const DeviceDetector = require('device-detector-js');
    const deviceDetector = new DeviceDetector();
    const userAgent = deviceDetector.parse(req.headers['user-agent'] as string);
    const deviceData = ` ${userAgent?.client?.name} ${userAgent?.client?.version} ${userAgent?.device?.type} ${userAgent?.os?.name} ${userAgent?.os?.platform}`;

    req['deviceData'] = deviceData;

    return next.handle().pipe(
      tap(() => {
        //     const logJson = {
        //         requestTime: `${Date.now() - now}ms`,
        //         ipInfo,
        //         deviceData,
        //         userId,
        //         userLogin,
        //         controller: `${context.getClass().name}.${context.getHandler().name}()` ,
        //         method: req.method,
        //         url: req.url,
        //         selectFields: req.headers['select-fields'],
        //         body: req.body?.slice && req.body?.slice(0,10000),
        //         error: v instanceof Error ? v : undefined
        //     }
        //     createLog('access',JSON.stringify(logJson));
        //     if( v instanceof Error){
        //         createLog('errors',JSON.stringify(logJson));
        //     }
        Logger.debug(
          `${ipInfo} [${Date.now() - now}ms] (${deviceData}) (${userId})(${userLogin})  ${context.getClass().name}.${context.getHandler().name}() : ${req.method} ${req.url}${typeof req.headers['select-fields'] !== 'undefined' ? ' (SelectFields: ' + req.headers['select-fields'] + ')' : ''}. ${
            ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body).slice(0, 10000) : ''
          }`
        );
      })
    );
  }
}
