import { SubContents } from '../../../entities/sub-contents/_base/sub-contents.entity';
import { SubContentsDTO } from './sub-contents.dto';

/**
 * A SubContents mapper object.
 */
export class SubContentsMapper {
    static fromDTOtoEntity(entityDTO: SubContentsDTO): SubContents {
        if (!entityDTO) {
            return;
        }
        let entity = new SubContents();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: SubContents): SubContentsDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new SubContentsDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
