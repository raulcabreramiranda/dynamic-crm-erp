import { EntityRepository, Repository } from 'typeorm';
import { ConfigureCorrection } from './_base/configure-correction.entity';

@EntityRepository(ConfigureCorrection)
export class ConfigureCorrectionRepository extends Repository<ConfigureCorrection> {}
