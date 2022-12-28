import { CerneClass } from './cerne-class.entity';
import { CerneClassDTO } from './cerne-class.dto';

/**
 * A CerneClass mapper object.
 */
export class CerneClassMapper {
    static fromDTOtoEntity(entityDTO: CerneClassDTO): CerneClass {
        if (!entityDTO) {
            return;
        }
        let entity = new CerneClass();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CerneClass): CerneClassDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CerneClassDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
