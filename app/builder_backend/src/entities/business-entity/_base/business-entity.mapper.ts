import { BusinessEntity } from './business-entity.entity';
import { BusinessEntityDTO } from './business-entity.dto';

/**
 * A BusinessEntity mapper object.
 */
export class BusinessEntityMapper {
    static fromDTOtoEntity(entityDTO: BusinessEntityDTO): BusinessEntity {
        if (!entityDTO) {
            return;
        }
        let entity = new BusinessEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: BusinessEntity): BusinessEntityDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new BusinessEntityDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
