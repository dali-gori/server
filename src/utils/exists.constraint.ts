// exists-in-db.constraint.ts
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsInDbConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    if (value === undefined || value === null) return true; // skip if optional

    const [entityClass, column] = args.constraints;
    const repo = this.dataSource.getRepository(entityClass);

    const record = await repo.findOne({ where: { [column]: value } });
    return !!record;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass, column] = args.constraints;
    return `${column} does not exist in ${entityClass.name}`;
  }
}
