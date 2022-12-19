import { EntityRepository, Repository } from 'typeorm';
import { MasterTeacher } from './_base/master-teacher.entity';

@EntityRepository(MasterTeacher)
export class MasterTeacherRepository extends Repository<MasterTeacher> {}
