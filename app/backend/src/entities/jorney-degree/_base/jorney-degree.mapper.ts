import { JorneyDegree } from './jorney-degree.entity';
import { JorneyDegreeDTO } from './jorney-degree.dto';

/**
 * A JorneyDegree mapper object.
 */
export class JorneyDegreeMapper {
    static fromDTOtoEntity(entityDTO: JorneyDegreeDTO): JorneyDegree {
        if (!entityDTO) {
            return;
        }
        let entity = new JorneyDegree();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: JorneyDegree): JorneyDegreeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new JorneyDegreeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
