import { EntityRepository, Repository } from 'typeorm';
import { JorneyDegreesThemes } from './_base/jorney-degrees-themes.entity';

@EntityRepository(JorneyDegreesThemes)
export class JorneyDegreesThemesRepository extends Repository<JorneyDegreesThemes> {}
