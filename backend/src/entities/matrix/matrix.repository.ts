import { EntityRepository, Repository } from 'typeorm';
import { Matrix } from './_base/matrix.entity';

@EntityRepository(Matrix)
export class MatrixRepository extends Repository<Matrix> {}
