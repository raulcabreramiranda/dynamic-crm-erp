import { EntityRepository, Repository } from 'typeorm';
import { ConfigureApplication } from './_base/configure-application.entity';

@EntityRepository(ConfigureApplication)
export class ConfigureApplicationRepository extends Repository<ConfigureApplication> {}
