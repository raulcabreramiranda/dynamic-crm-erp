import { EntityRepository, Repository } from 'typeorm';
import { ConfigureCorrectionReviewer } from './_base/configure-correction-reviewer.entity';

@EntityRepository(ConfigureCorrectionReviewer)
export class ConfigureCorrectionReviewerRepository extends Repository<ConfigureCorrectionReviewer> {}
