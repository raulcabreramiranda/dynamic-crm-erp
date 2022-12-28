import { Param, Res, UseGuards, Controller, Get, Logger, Req, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard, RolesGuard } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Account Resources')
export class AccountController {
  logger = new Logger('AccountController');

  constructor(private readonly authService: AuthService) {}

  @Get('/authenticate')
  @ApiOperation({ description: 'Check if the user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'login authenticated',
  })
  isAuthenticated(@Req() req: Request): any {
    const user: any = req['user'];
    return user.login;
  }

  @Get('/change-plataform/:module')
  @ApiOperation({ description: 'Check if the user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'login authenticated',
  })
  async changePlataformLink(@Req() req: Request, @Res() res: Response, @Param('module') module: string): Promise<any> {
    const user: any = req['user'];
    const link = await this.authService.changePlataformLink(module, user);
    return res.json(link);
  }

  @Get('/change-school/:module/:whiteLabel')
  @ApiOperation({ description: 'Check if the user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'login authenticated',
  })
  async changeSchoolLink(@Req() req: Request, @Res() res: Response, @Param('module') module: string, @Param('whiteLabel') whiteLabel: string): Promise<any> {
    const user: any = req['user'];
    const link = await this.authService.changeSchoolLink(module, whiteLabel, user);
    return res.json(link);
  }

  @Get('/change-estimate-grades/enemfit/:masterId/:degreeId')
  @ApiResponse({
    status: 200,
    description: 'login authenticated',
  })
  async changeToEstimateGradesEnemFitLink(@Req() req: Request, @Res() res: Response, @Param('masterId') masterId: string, @Param('degreeId') degreeId: string): Promise<any> {
    const user: any = req['user'];
    const link = await this.authService.changeToEstimateGradesEnemFitLink(masterId, degreeId, req['user']['whiteLabel'], user);
    return res.json(link);
  }

  @Get('/change-estimate-grades/exam/:examId/:degreeId')
  @ApiResponse({
    status: 200,
    description: 'login authenticated',
  })
  async changeToEstimateGradesExamLink(@Req() req: Request, @Res() res: Response, @Param('examId') examId: string, @Param('degreeId') degreeId: string): Promise<any> {
    const user: any = req['user'];
    const link = await this.authService.changeToEstimateGradesExamLink(examId, degreeId, req['user']['whiteLabel'], user);
    return res.json(link);
  }
}
