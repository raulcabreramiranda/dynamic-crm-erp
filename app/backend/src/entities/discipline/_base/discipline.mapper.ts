import { Discipline } from './discipline.entity';
import { DisciplineDTO } from './discipline.dto';

/**
 * A Discipline mapper object.
 */
export class DisciplineMapper {
    static fromDTOtoEntity(entityDTO: DisciplineDTO): Discipline {
        if (!entityDTO) {
            return;
        }
        let entity = new Discipline();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Discipline): DisciplineDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new DisciplineDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
