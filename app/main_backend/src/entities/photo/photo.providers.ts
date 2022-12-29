import { Photo } from './_base/photo.entity';
import { DataSource } from 'typeorm';

export const photoProviders = [
    {
        provide: 'PHOTO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
        inject: ['DATA_SOURCE'],
    },
];
