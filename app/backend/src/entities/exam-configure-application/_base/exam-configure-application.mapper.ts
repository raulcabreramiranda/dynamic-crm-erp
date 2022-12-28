import { ExamConfigureApplication } from './exam-configure-application.entity';
import { ExamConfigureApplicationDTO } from './exam-configure-application.dto';

/**
 * A ExamConfigureApplication mapper object.
 */
export class ExamConfigureApplicationMapper {
    static fromDTOtoEntity(entityDTO: ExamConfigureApplicationDTO): ExamConfigureApplication {
        if (!entityDTO) {
            return;
        }
        let entity = new ExamConfigureApplication();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ExamConfigureApplication): ExamConfigureApplicationDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ExamConfigureApplicationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
