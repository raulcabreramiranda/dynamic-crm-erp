import { EntityRepository, Repository } from 'typeorm';
import { JorneyGalery } from './_base/jorney-galery.entity';

@EntityRepository(JorneyGalery)
export class JorneyGaleryRepository extends Repository<JorneyGalery> {}
