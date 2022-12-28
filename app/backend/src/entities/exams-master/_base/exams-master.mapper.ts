import { ExamsMaster } from './exams-master.entity';
import { ExamsMasterDTO } from './exams-master.dto';

/**
 * A ExamsMaster mapper object.
 */
export class ExamsMasterMapper {
    static fromDTOtoEntity(entityDTO: ExamsMasterDTO): ExamsMaster {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamsMaster();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamsMaster): ExamsMasterDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamsMasterDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
