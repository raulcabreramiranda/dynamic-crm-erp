import { EntityRepository, Repository } from 'typeorm';
import { TrainingEnvironment } from './_base/training-environment.entity';

@EntityRepository(TrainingEnvironment)
export class TrainingEnvironmentRepository extends Repository<TrainingEnvironment> {}
