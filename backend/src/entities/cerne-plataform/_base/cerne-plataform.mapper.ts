import { CernePlataform } from '../../../entities/cerne-plataform/_base/cerne-plataform.entity';
import { CernePlataformDTO } from './cerne-plataform.dto';

/**
 * A CernePlataform mapper object.
 */
export class CernePlataformMapper {
    static fromDTOtoEntity(entityDTO: CernePlataformDTO): CernePlataform {
        if (!entityDTO) {
            return;
        }
        let entity = new CernePlataform();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CernePlataform): CernePlataformDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CernePlataformDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
