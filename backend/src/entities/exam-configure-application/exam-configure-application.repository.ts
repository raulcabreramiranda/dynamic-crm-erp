import { EntityRepository, Repository } from 'typeorm';
import { ExamConfigureApplication } from './_base/exam-configure-application.entity';

@EntityRepository(ExamConfigureApplication)
export class ExamConfigureApplicationRepository extends Repository<ExamConfigureApplication> {}
