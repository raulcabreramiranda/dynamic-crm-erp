import { EntityRepository, Repository } from 'typeorm';
import { Font } from './_base/font.entity';

@EntityRepository(Font)
export class FontRepository extends Repository<Font> {}
