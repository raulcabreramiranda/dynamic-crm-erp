import { Subsidiary } from '../../../entities/subsidiary/_base/subsidiary.entity';
import { SubsidiaryDTO } from './subsidiary.dto';

/**
 * A Subsidiary mapper object.
 */
export class SubsidiaryMapper {
    static fromDTOtoEntity(entityDTO: SubsidiaryDTO): Subsidiary {
        if (!entityDTO) {
            return;
        }
        let entity = new Subsidiary();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Subsidiary): SubsidiaryDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new SubsidiaryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
