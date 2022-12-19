import { EntityRepository, Repository } from 'typeorm';
import { EssayResult } from './_base/essay-result.entity';

@EntityRepository(EssayResult)
export class EssayResultRepository extends Repository<EssayResult> {}
