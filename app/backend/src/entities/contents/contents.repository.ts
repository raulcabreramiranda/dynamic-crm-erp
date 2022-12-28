import { EntityRepository, Repository } from 'typeorm';
import { Contents } from './_base/contents.entity';

@EntityRepository(Contents)
export class ContentsRepository extends Repository<Contents> {}
