import { EntityRepository, Repository } from 'typeorm';
import { JorneyGalerySectionSubject } from './_base/jorney-galery-section-subject.entity';

@EntityRepository(JorneyGalerySectionSubject)
export class JorneyGalerySectionSubjectRepository extends Repository<JorneyGalerySectionSubject> {}
