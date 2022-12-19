import { Skill } from '../../../entities/skill/_base/skill.entity';
import { SkillDTO } from './skill.dto';

/**
 * A Skill mapper object.
 */
export class SkillMapper {
    static fromDTOtoEntity(entityDTO: SkillDTO): Skill {
        if (!entityDTO) {
            return;
        }
        let entity = new Skill();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Skill): SkillDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new SkillDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
