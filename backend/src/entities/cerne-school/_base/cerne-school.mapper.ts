import { CerneSchool } from '../../../entities/cerne-school/_base/cerne-school.entity';
import { CerneSchoolDTO } from './cerne-school.dto';

/**
 * A CerneSchool mapper object.
 */
export class CerneSchoolMapper {
    static fromDTOtoEntity(entityDTO: CerneSchoolDTO): CerneSchool {
        if (!entityDTO) {
            return;
        }
        let entity = new CerneSchool();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CerneSchool): CerneSchoolDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CerneSchoolDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
