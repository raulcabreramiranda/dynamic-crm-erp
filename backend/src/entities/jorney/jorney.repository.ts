import { EntityRepository, Repository } from 'typeorm';
import { Jorney } from './_base/jorney.entity';

@EntityRepository(Jorney)
export class JorneyRepository extends Repository<Jorney> {}
