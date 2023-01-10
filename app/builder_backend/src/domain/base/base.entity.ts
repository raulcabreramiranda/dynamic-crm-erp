import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  /*   @ManyToOne(type => User)
  @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
  createdBy?: User;
 */
  /* 
  @ManyToOne(type => User)
  @JoinColumn({ name: 'lastModifiedBy', referencedColumnName: 'id' })
  lastModifiedBy?: User;
   */

  // @Column({ name: 'createdBy', nullable: true })
  // @ApiProperty({required: false })
  // createdBy?: Number;

  // @Column({ name: 'createdDate', type: 'datetime', nullable: true })
  // @ApiProperty({required: false })
  // createdDate?: Date;

  // @Column({ name: 'lastModifiedBy', nullable: true })
  // @ApiProperty({required: false })
  // lastModifiedBy?: Number;

  // @Column({ name: 'lastModifiedDate', type: 'datetime', nullable: true })
  // @ApiProperty({required: false })
  // lastModifiedDate?: Date;
}
