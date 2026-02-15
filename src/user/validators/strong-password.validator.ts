// validators/strong-password.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validator from 'validator';

@ValidatorConstraint({ async: false })
export class StrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string) {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  }

  defaultMessage() {
    return 'Password is not strong enough. It must include uppercase, lowercase, number, and symbol.';
  }
}

export function IsStrongPassword(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: StrongPasswordConstraint,
    });
  };
}
