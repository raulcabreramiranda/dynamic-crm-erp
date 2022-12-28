import { EntityRepository, Repository } from 'typeorm';
import { MatrixAnnulmentReason } from './_base/matrix-annulment-reason.entity';

@EntityRepository(MatrixAnnulmentReason)
export class MatrixAnnulmentReasonRepository extends Repository<MatrixAnnulmentReason> {}
