import { EntityRepository, Repository } from 'typeorm';
import { EssayExternalReview } from './_base/essay-external-review.entity';

@EntityRepository(EssayExternalReview)
export class EssayExternalReviewRepository extends Repository<EssayExternalReview> {}
