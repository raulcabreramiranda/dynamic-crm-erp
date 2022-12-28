import { EntityRepository, Repository } from 'typeorm';
import { CernePlataformUser } from './_base/cerne-plataform-user.entity';

@EntityRepository(CernePlataformUser)
export class CernePlataformUserRepository extends Repository<CernePlataformUser> {}
