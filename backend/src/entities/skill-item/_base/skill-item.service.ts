import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import SkillItem from './skill-item.entity';
import { SkillItemRepository } from '../skill-item.repository';
import { getManyAndCount } from '../../../utilsFunctions';

const relationshipNames = [];
relationshipNames.push('skill');
relationshipNames.push('essayResults');
relationshipNames.push('essayResultsFinal');

@Injectable({ scope: Scope.REQUEST })
export class SkillItemService {
    logger = new Logger('SkillItemService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(SkillItemRepository) protected skillItemRepository: SkillItemRepository) {}

    async findById(id: string, selectFields?: string[], selectColumns?: string): Promise<SkillItem | undefined> {
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
        const result = await getManyAndCount(options, [], SkillItem, { id: this.request['user']?.['id'], whiteLabel: this.request['user']?.['whiteLabel'] }, selectColumns);
        return result[1] > 0 ? result[0][0] : null;
    }

    async findByfields(options: FindOneOptions<SkillItem>): Promise<SkillItem | undefined> {
        return await this.skillItemRepository.findOne(options);
    }

    async findAndCount(
        options: FindManyOptions<SkillItem>,
        filters?: Array<{ column: string; value: string; operation: string }>[],
        selectFields?: string[],
        selectColumns?: string,
    ): Promise<[SkillItem[], number]> {
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
        return await getManyAndCount(options, filters, SkillItem, { id: this.request['user']?.['id'], whiteLabel: this.request['user']?.['whiteLabel'] }, selectColumns);
    }

    async save(skillItem: SkillItem): Promise<SkillItem | undefined> {
        const element = await this.skillItemRepository.save(skillItem);
        return element;
    }

    async update(skillItem: SkillItem): Promise<SkillItem | undefined> {
        const element = await this.skillItemRepository.save(skillItem);
        return element;
    }

    async delete(skillItem: SkillItem): Promise<SkillItem | undefined> {
        const element = await this.skillItemRepository.remove(skillItem);
        return element;
    }
}
