import { Matrix } from './matrix.entity';
import { MatrixDTO } from './matrix.dto';

/**
 * A Matrix mapper object.
 */
export class MatrixMapper {
    static fromDTOtoEntity(entityDTO: MatrixDTO): Matrix {
        if (!entityDTO) {
            return;
        }
        let entity = new Matrix();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Matrix): MatrixDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new MatrixDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
