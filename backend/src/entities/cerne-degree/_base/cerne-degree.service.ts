import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import CerneDegree from './cerne-degree.entity';
import { CerneDegreeRepository } from '../cerne-degree.repository';
import { getManyAndCount } from '../../../utilsFunctions';

const relationshipNames = [];
relationshipNames.push('contents');
relationshipNames.push('exam');
relationshipNames.push('cernePlataformUser');
relationshipNames.push('jorneyDegrees');
relationshipNames.push('cerneClasses');
relationshipNames.push('themes');

@Injectable({ scope: Scope.REQUEST })
export class CerneDegreeService {
    logger = new Logger('CerneDegreeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(CerneDegreeRepository) protected cerneDegreeRepository: CerneDegreeRepository) {}

    async findById(id: string, selectFields?: string[], selectColumns?: string): Promise<CerneDegree | undefined> {
        const options: any = {};
        if (selectFields && selectFields.length > 0) {
            const joinRelations = [];
            selectFields
                .filter((v) => v.includes('.'))
                .map((v) => {
                    let _joinAux = '';
                    v.split('.')
                        .splice(0, v.split('.').length - 1)
                        .map((v1) => {
                            if (!joinRelations.includes(_joinAux + v1)) {
                                joinRelations.push(_joinAux + v1);
                            }
                            _joinAux = _joinAux + v1 + '.';
                        });
                });
            options.relations = joinRelations;
        } else {
            options.relations = relationshipNames;
        }

        options.where = { id: Equal(Number.parseInt(id)) };
        const result = await getManyAndCount(options, [], CerneDegree, { id: this.request['user']?.['id'], whiteLabel: this.request['user']?.['whiteLabel'] }, selectColumns);
        return result[1] > 0 ? result[0][0] : null;
    }

    async findByfields(options: FindOneOptions<CerneDegree>): Promise<CerneDegree | undefined> {
        return await this.cerneDegreeRepository.findOne(options);
    }

    async findAndCount(
        options: FindManyOptions<CerneDegree>,
        filters?: Array<{ column: string; value: string; operation: string }>[],
        selectFields?: string[],
        selectColumns?: string,
    ): Promise<[CerneDegree[], number]> {
        const optionJoinAndSelect = {};

        if (filters && filters.length > 0) {
            selectFields = selectFields && selectFields.length > 0 ? selectFields : [];
            filters.forEach((v) => {
                selectFields.push(v['column']);
            });
        }

        if (selectFields && selectFields.length > 0) {
            // const _select: any = selectFields.filter(v=>!v.includes("."));
            // options.select = ["id", ..._select];
            // selectFields.filter(v=>v.includes(".")).map(v=>{
            //   v.split('.').splice(0, (v.split('.').length)-1).map((v1)=>{
            //     optionJoinAndSelect[v.split('.').splice(0,i+1).join('_')] = (i===0 ? 'filterJoin' : v.split('.')[i-1]) + '.' + v.split('.')[i];
            //   })
            // })
            const joinRelations = [];
            selectFields
                .filter((v) => v.includes('.'))
                .map((v) => {
                    let _joinAux = '';
                    v.split('.')
                        .splice(0, v.split('.').length - 1)
                        .map((v1) => {
                            if (!joinRelations.includes(_joinAux + v1)) {
                                joinRelations.push(_joinAux + v1);
                            }
                            _joinAux = _joinAux + v1 + '.';
                        });
                });
            options.relations = joinRelations;
        } else {
            options.relations = relationshipNames;
        }

        let where = {};
        for (const i in filters) {
            if (filters[i] && filters[i]['column'].split('.').length === 1) {
                const element = filters[i];
                if (element['value']) {
                    if (element['operation'] === 'contains') {
                        where[element['column']] = Like('%' + element['value'] + '%');
                    } else if (element['operation'] === 'equals') {
                        where[element['column']] = Equal(element['value']);
                    } else if (element['operation'] === 'in') {
                        where[element['column']] = In(element['value'].split(','));
                    } else if (element['operation'] === 'notIn') {
                        where[element['column']] = Not(In(element['value'].split(',')));
                    } else if (element['operation'] === 'greaterThan') {
                        where[element['column']] = MoreThan(element['value']);
                    } else if (element['operation'] === 'lessThan') {
                        where[element['column']] = LessThan(element['value']);
                    } else if (element['operation'] === 'greaterOrEqualThan') {
                        where[element['column']] = MoreThanOrEqual(element['value']);
                    } else if (element['operation'] === 'lessOrEqualThan') {
                        where[element['column']] = LessThanOrEqual(element['value']);
                    } else if (element['operation'] === 'between') {
                        where[element['column']] = Between(element['value'].split(',')[0], element['value'].split(',')[1]);
                    } else if (element['operation'] === 'specified' && element['value'] == 'true') {
                        where[element['column']] = Not(IsNull());
                    } else if (element['operation'] === 'specified' && element['value'] == 'false') {
                        where[element['column']] = IsNull();
                    }
                }
            }
        }

        const optionJoins = {};
        filters
            .filter((v) => v['column'] && v['column'].split('.').length > 1)
            .map((v) => {
                if (!Object.keys(optionJoinAndSelect).includes(v['column'].split('.')[0])) {
                    optionJoins[v['column'].split('.')[0]] = 'filterJoin.' + v['column'].split('.')[0];
                }
            });
        options.join = { alias: 'filterJoin', leftJoin: { ...optionJoins }, leftJoinAndSelect: { ...optionJoinAndSelect } };
        options.where = where;
        return await getManyAndCount(options, filters, CerneDegree, { id: this.request['user']?.['id'], whiteLabel: this.request['user']?.['whiteLabel'] }, selectColumns);
    }

    async save(cerneDegree: CerneDegree): Promise<CerneDegree | undefined> {
        const element = await this.cerneDegreeRepository.save(cerneDegree);
        return element;
    }

    async update(cerneDegree: CerneDegree): Promise<CerneDegree | undefined> {
        const element = await this.cerneDegreeRepository.save(cerneDegree);
        return element;
    }

    async delete(cerneDegree: CerneDegree): Promise<CerneDegree | undefined> {
        const element = await this.cerneDegreeRepository.remove(cerneDegree);
        return element;
    }
}