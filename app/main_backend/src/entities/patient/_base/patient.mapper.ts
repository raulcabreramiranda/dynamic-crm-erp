import { Patient } from '../../../entities/patient/_base/patient.entity';
import { PatientDTO } from './patient.dto';

/**
 * A Patient mapper object.
 */
export class PatientMapper {
    static fromDTOtoEntity(entityDTO: PatientDTO): Patient {
        if (!entityDTO) {
            return;
        }
        let entity = new Patient();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Patient): PatientDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new PatientDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
