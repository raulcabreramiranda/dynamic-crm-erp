import { EntityRepository, Repository } from 'typeorm';
import { TrainingEnvironmentContent } from './_base/training-environment-content.entity';

@EntityRepository(TrainingEnvironmentContent)
export class TrainingEnvironmentContentRepository extends Repository<TrainingEnvironmentContent> {}
