/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { Theme } from '../../theme/_base/theme.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['JorneyDegreesThemes'] ?? 'JorneyDegreesThemes')
export class JorneyDegreesThemes extends BaseEntity {
    static columnsMetaData() {
        return {
            startDate: Date,
            endDate: Date,
            jorneyDegree: JorneyDegree,
            theme: Theme,
        };
    }

    @Column({ type: 'datetime', name: 'startDate', nullable: true })
    @ApiProperty({ required: false })
    startDate: Date;

    @Column({ type: 'datetime', name: 'endDate', nullable: true })
    @ApiProperty({ required: false })
    endDate: Date;

    @ManyToOne(() => JorneyDegree, (other) => other.jorneyDegreesThemes)
    jorneyDegree: JorneyDegree;

    @ManyToOne(() => Theme, (other) => other.jorneyDegreesThemes)
    theme: Theme;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default JorneyDegreesThemes;
