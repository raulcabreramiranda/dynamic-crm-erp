import { EntityRepository, Repository } from 'typeorm';
import { SubContents } from './_base/sub-contents.entity';

@EntityRepository(SubContents)
export class SubContentsRepository extends Repository<SubContents> {}
