/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { PhotoTypeContent } from './photo-type-content.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['Photo'] ?? 'Photo')
export class Photo extends BaseEntity {
    static columnsMetaData() {
        return {
            description: String,
            title: String,
            hour: String,
            link: String,
            linkContentType: String,
            typeContent: PhotoTypeContent,
        };
    }

    @Column({ type: 'text', name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'title', nullable: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ name: 'hour', nullable: true })
    @ApiProperty({ required: false })
    hour: string;

    @Column({ type: 'text', name: 'link', nullable: true })
    @ApiProperty({ required: false })
    link: string;

    @Column({ name: 'linkContentType', nullable: true })
    @ApiProperty({ required: false })
    linkContentType: string;

    @Column({ type: 'simple-enum', name: 'typeContent', enum: PhotoTypeContent, nullable: true })
    @ApiProperty({ required: false })
    typeContent: PhotoTypeContent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Photo;
