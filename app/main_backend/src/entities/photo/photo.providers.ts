import { Photo } from './_base/photo.entity';

import { DataSource, Repository } from 'typeorm';

// eslint-disable-next-line
export interface IPhotoRepository extends Repository<Photo> {}

export const photoProviders = [
    {
        provide: 'PHOTO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo).extend({}),
        inject: ['DATA_SOURCE'],
    },
];
