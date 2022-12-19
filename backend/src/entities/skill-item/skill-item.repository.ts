import { EntityRepository, Repository } from 'typeorm';
import { SkillItem } from './_base/skill-item.entity';

@EntityRepository(SkillItem)
export class SkillItemRepository extends Repository<SkillItem> {}
