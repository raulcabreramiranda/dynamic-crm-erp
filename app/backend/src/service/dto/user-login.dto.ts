import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import AdminUser from 'src/entities/admin-user/_base/admin-user.entity';

export class AuthorizeResponseDTO {
  @ApiProperty({ description: 'User password', required: true })
  @IsString()
  readonly id_token: string;

  @ApiProperty({ description: 'User login name', required: true })
  @IsString()
  readonly user: AdminUser;
}
export class UserLoginDTO {
  @ApiProperty({ description: 'User login name', required: true })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'User password', required: false })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'User login module', required: false })
  @IsString()
  readonly module?: 'redacao' | 'provas' | 'enemfit';

  @ApiProperty({ description: 'User login whitelabel', required: false })
  @IsString()
  readonly whiteLabel?: number;
}
