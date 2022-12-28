/* eslint-disable max-classes-per-file */
import { BaseEntity } from './base.entity';
import { Type, Expose as JsonProperty } from 'class-transformer';

export class Sort {
  public property: string;
  public direction: 'ASC' | 'DESC' | string;
  constructor(sort: string) {
    if (sort) {
      [this.property, this.direction] = sort.split(',');
    }
  }

  asOrder(selectFields = ''): any {
    const order = {};
    const selectFieldsArray = selectFields.split(',').filter((v) => v && !v.includes('.'));
    if (this.property !== 'id' && selectFieldsArray.length > 0 && !selectFieldsArray.includes(this.property)) {
      order[selectFieldsArray[0]] = this.direction.toUpperCase();
    } else {
      order[this.property] = this.direction.toUpperCase();
    }
    return order;
  }
}

export class PageRequest {
  @JsonProperty()
  page = 0;
  @JsonProperty()
  size = 2000;
  @Type(() => Sort)
  sort: Sort = new Sort('id,ASC');

  constructor(page: any, size: any, sort: any) {
    this.page = +page || this.page;
    this.size = +size || this.size;
    this.sort = sort ? new Sort(sort) : this.sort;
  }
}

export class Page<T extends BaseEntity> {
  constructor(public content: T[], public total: number, public pageable: PageRequest) {}
}
