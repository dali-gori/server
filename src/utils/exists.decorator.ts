import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistsInDbConstraint } from './exists.constraint';

export function ExistsInDb(
  entity: Function,
  column: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: ExistsInDbConstraint,
    });
  };
}