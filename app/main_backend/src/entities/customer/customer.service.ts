import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Customer from './_base/customer.entity';
import { CustomerService as CustomerServiceBase } from './_base/customer.service';
import { ICustomerRepository } from './customer.providers';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class CustomerService extends CustomerServiceBase {
    logger = new Logger('CustomerService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('CUSTOMER_REPOSITORY') protected customerRepository: ICustomerRepository) {
        super(request, customerRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.customerRepository.count(options);
    }
}
