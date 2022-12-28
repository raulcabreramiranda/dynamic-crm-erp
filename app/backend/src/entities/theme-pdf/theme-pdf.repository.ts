import { EntityRepository, Repository } from 'typeorm';
import { ThemePdf } from './_base/theme-pdf.entity';

@EntityRepository(ThemePdf)
export class ThemePdfRepository extends Repository<ThemePdf> {}
