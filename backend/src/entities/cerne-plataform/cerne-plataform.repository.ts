import { EntityRepository, Repository } from 'typeorm';
import { CernePlataform } from './_base/cerne-plataform.entity';

@EntityRepository(CernePlataform)
export class CernePlataformRepository extends Repository<CernePlataform> {}
