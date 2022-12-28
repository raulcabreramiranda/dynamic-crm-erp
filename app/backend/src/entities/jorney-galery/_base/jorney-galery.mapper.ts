import { JorneyGalery } from './jorney-galery.entity';
import { JorneyGaleryDTO } from './jorney-galery.dto';

/**
 * A JorneyGalery mapper object.
 */
export class JorneyGaleryMapper {
    static fromDTOtoEntity(entityDTO: JorneyGaleryDTO): JorneyGalery {
        if (!entityDTO) {
            return;
        }
        let entity = new JorneyGalery();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: JorneyGalery): JorneyGaleryDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new JorneyGaleryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
