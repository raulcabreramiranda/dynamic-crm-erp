import { DisciplineSuperPro } from './discipline-super-pro.entity';
import { DisciplineSuperProDTO } from './discipline-super-pro.dto';

/**
 * A DisciplineSuperPro mapper object.
 */
export class DisciplineSuperProMapper {
    static fromDTOtoEntity(entityDTO: DisciplineSuperProDTO): DisciplineSuperPro {
        if (!entityDTO) {
            return;
        }
        let entity = new DisciplineSuperPro();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: DisciplineSuperPro): DisciplineSuperProDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new DisciplineSuperProDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
