import { EntityRepository, Repository } from 'typeorm';
import { EssayResultComment } from './_base/essay-result-comment.entity';

@EntityRepository(EssayResultComment)
export class EssayResultCommentRepository extends Repository<EssayResultComment> {}
