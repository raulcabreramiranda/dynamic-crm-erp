import { EntityRepository, Repository } from 'typeorm';
import { Photo } from './_base/photo.entity';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {}
