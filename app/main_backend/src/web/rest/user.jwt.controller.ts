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
}
