import { BusinessEntityField } from '../../../entities/business-entity-field/_base/business-entity-field.entity';
import { BusinessEntityFieldDTO } from './business-entity-field.dto';

/**
 * A BusinessEntityField mapper object.
 */
export class BusinessEntityFieldMapper {
    static fromDTOtoEntity(entityDTO: BusinessEntityFieldDTO): BusinessEntityField {
        if (!entityDTO) {
            return;
        }
        let entity = new BusinessEntityField();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: BusinessEntityField): BusinessEntityFieldDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new BusinessEntityFieldDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
