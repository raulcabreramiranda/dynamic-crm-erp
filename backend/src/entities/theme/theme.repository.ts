import { EntityRepository, Repository } from 'typeorm';
import { Theme } from './_base/theme.entity';

@EntityRepository(Theme)
export class ThemeRepository extends Repository<Theme> {}
