import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller()
@UseInterceptors(LoggingInterceptor)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  getHello(): Promise<Photo[]> {
    return this.photoService.findAll();
  }
}
