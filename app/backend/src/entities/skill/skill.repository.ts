import { EntityRepository, Repository } from 'typeorm';
import { Skill } from './_base/skill.entity';

@EntityRepository(Skill)
export class SkillRepository extends Repository<Skill> {}
