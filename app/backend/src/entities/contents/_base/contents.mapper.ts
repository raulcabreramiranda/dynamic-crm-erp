import { Contents } from './contents.entity';
import { ContentsDTO } from './contents.dto';

/**
 * A Contents mapper object.
 */
export class ContentsMapper {
    static fromDTOtoEntity(entityDTO: ContentsDTO): Contents {
        if (!entityDTO) {
            return;
        }
        let entity = new Contents();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Contents): ContentsDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ContentsDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
