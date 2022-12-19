import { OLDCerneSchool } from '../../../entities/o-l-d-cerne-school/_base/o-l-d-cerne-school.entity';
import { OLDCerneSchoolDTO } from './o-l-d-cerne-school.dto';

/**
 * A OLDCerneSchool mapper object.
 */
export class OLDCerneSchoolMapper {
    static fromDTOtoEntity(entityDTO: OLDCerneSchoolDTO): OLDCerneSchool {
        if (!entityDTO) {
            return;
        }
        let entity = new OLDCerneSchool();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: OLDCerneSchool): OLDCerneSchoolDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new OLDCerneSchoolDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
