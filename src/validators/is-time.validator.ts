import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTime', async: false })
export class IsTimeConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(value);
  }

  defaultMessage(): string {
    return 'Invalid time format (should be hh:mm:ss)';
  }
}
