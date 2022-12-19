import { SkillItem } from '../../../entities/skill-item/_base/skill-item.entity';
import { SkillItemDTO } from './skill-item.dto';

/**
 * A SkillItem mapper object.
 */
export class SkillItemMapper {
    static fromDTOtoEntity(entityDTO: SkillItemDTO): SkillItem {
        if (!entityDTO) {
            return;
        }
        let entity = new SkillItem();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: SkillItem): SkillItemDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new SkillItemDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
