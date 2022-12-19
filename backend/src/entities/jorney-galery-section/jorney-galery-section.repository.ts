import { EntityRepository, Repository } from 'typeorm';
import { JorneyGalerySection } from './_base/jorney-galery-section.entity';

@EntityRepository(JorneyGalerySection)
export class JorneyGalerySectionRepository extends Repository<JorneyGalerySection> {}
