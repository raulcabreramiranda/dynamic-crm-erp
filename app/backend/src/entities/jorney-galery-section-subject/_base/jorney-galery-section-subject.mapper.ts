import { JorneyGalerySectionSubject } from './jorney-galery-section-subject.entity';
import { JorneyGalerySectionSubjectDTO } from './jorney-galery-section-subject.dto';

/**
 * A JorneyGalerySectionSubject mapper object.
 */
export class JorneyGalerySectionSubjectMapper {
    static fromDTOtoEntity(entityDTO: JorneyGalerySectionSubjectDTO): JorneyGalerySectionSubject {
        if (!entityDTO) {
            return;
        }
        let entity = new JorneyGalerySectionSubject();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: JorneyGalerySectionSubject): JorneyGalerySectionSubjectDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new JorneyGalerySectionSubjectDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
