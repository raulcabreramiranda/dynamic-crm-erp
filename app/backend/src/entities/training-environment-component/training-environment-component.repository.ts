import { EntityRepository, Repository } from 'typeorm';
import { TrainingEnvironmentComponent } from './_base/training-environment-component.entity';

@EntityRepository(TrainingEnvironmentComponent)
export class TrainingEnvironmentComponentRepository extends Repository<TrainingEnvironmentComponent> {}
