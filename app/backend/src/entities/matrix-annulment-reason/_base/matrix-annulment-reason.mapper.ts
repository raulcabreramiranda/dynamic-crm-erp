import { MatrixAnnulmentReason } from './matrix-annulment-reason.entity';
import { MatrixAnnulmentReasonDTO } from './matrix-annulment-reason.dto';

/**
 * A MatrixAnnulmentReason mapper object.
 */
export class MatrixAnnulmentReasonMapper {
    static fromDTOtoEntity(entityDTO: MatrixAnnulmentReasonDTO): MatrixAnnulmentReason {
        if (!entityDTO) {
            return;
        }
        let entity = new MatrixAnnulmentReason();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: MatrixAnnulmentReason): MatrixAnnulmentReasonDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new MatrixAnnulmentReasonDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
