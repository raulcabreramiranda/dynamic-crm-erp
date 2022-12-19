import { EntityRepository, Repository } from 'typeorm';
import { ContentsMasterTeacher } from './_base/contents-master-teacher.entity';

@EntityRepository(ContentsMasterTeacher)
export class ContentsMasterTeacherRepository extends Repository<ContentsMasterTeacher> {}
