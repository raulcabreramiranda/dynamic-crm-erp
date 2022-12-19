import { Body, Controller, Logger, Post, Res, Req, UseInterceptors, Get, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthorizeResponseDTO, UserLoginDTO } from '../../service/dto/user-login.dto';
import { AuthService } from '../../service/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiExcludeEndpoint, ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
// import getRawBody = require('raw-body');
@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('Usuarios')
export class UserJWTController {
  logger = new Logger('UserJWTController');

  constructor(private readonly authService: AuthService) {}

  @Post('/authenticate')
  @ApiOperation({
    summary: 'Criar um token de login.',
    description: '<h3>Uma solicitação bem-sucedida para este endpoint permite que um aplicativo use um token de solicitação OAuth para solicitar autorização do usuário.</h3>',
  })
  @ApiResponse({
    status: 201,
    type: AuthorizeResponseDTO,
    description: 'Authorized',
  })
  async authorize(@Req() req: Request, @Body() user: UserLoginDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.login(user);

    res.setHeader('Authorization', 'Bearer ' + jwt.id_token);
    return res.json(jwt);
  }

  @Post('/login-token')
  @ApiOperation({
    summary: 'Criar um token de login.',
    description: '<h3>Uma solicitação bem-sucedida para este endpoint permite que um aplicativo use um token de solicitação OAuth para solicitar autorização do usuário.</h3>',
  })
  @ApiResponse({
    status: 201,
    description: 'Authorized',
  })
  async loginToken(@Req() req: Request, @Body() user: any, @Res() res: Response): Promise<any> {
    const link = await this.authService.loginToken(user);
    return res.json(link);
  }

  @Post('/:module/single-sign-on-core')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar um link de login.',
    description: '<h3>Criar um link de login de uso único para acessar a um dos modulos ja estando logado no sistema.</h3>',
  })
  @ApiParam({ name: 'module', type: 'string', description: 'mmmodule' })
  @ApiResponse({
    status: 201,
    description: 'Authorized',
  })
  async createLoginLink(@Req() req: Request, @Body() user: any, @Res() res: Response, @Param('module') module: string): Promise<any> {
    const link = await this.authService.createLoginLink(user, module);
    return res.json(link);
  }

  @Post('/react-errors')
  @ApiExcludeEndpoint()
  @ApiOperation({ description: 'Print Errors Reacts' })
  @ApiResponse({
    status: 201,
    description: 'Authorized',
  })
  async reactErrors(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.info('Error In Frontend');
    console.info(req.body);
    return res.json('ok');
  }

  @Get('/essay-external-review')
  @ApiOperation({
    summary: 'Enviar redações para Red1000.',
    description: '<h3>Enviar para Red1000 las redações finalizadas que no foram ja integradas.</h3>',
  })
  @ApiResponse({
    status: 201,
  })
  async externalReview() {
    return await this.authService.externalReview();
  }

  @Get('/essay-external-review-check')
  @ApiOperation({
    summary: 'Checkar as redações enviadas para Red1000.',
    description: '<h3>Checkar se as redações enviadas para Red1000j ja foram evaluadas.</h3>',
  })
  @ApiResponse({
    status: 201,
  })
  async externalReviewCheck() {
    return await this.authService.externalReviewCheck();
  }
}
