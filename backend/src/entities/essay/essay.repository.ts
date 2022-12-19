import { EntityRepository, Repository } from 'typeorm';
import { Essay } from './_base/essay.entity';

@EntityRepository(Essay)
export class EssayRepository extends Repository<Essay> {}
