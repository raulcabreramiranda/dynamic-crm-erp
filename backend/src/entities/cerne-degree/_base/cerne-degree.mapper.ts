import { CerneDegree } from '../../../entities/cerne-degree/_base/cerne-degree.entity';
import { CerneDegreeDTO } from './cerne-degree.dto';

/**
 * A CerneDegree mapper object.
 */
export class CerneDegreeMapper {
    static fromDTOtoEntity(entityDTO: CerneDegreeDTO): CerneDegree {
        if (!entityDTO) {
            return;
        }
        let entity = new CerneDegree();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CerneDegree): CerneDegreeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CerneDegreeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
