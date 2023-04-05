import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { PhotoController } from './photo.controller';

import { photoProviders } from './photo.providers';

import { PhotoService } from './photo.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [PhotoController],
    providers: [...photoProviders, PhotoService],
    exports: [PhotoService],
})
export class PhotoModule {}
