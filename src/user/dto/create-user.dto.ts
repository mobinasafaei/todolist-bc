import { IsEmail, IsString} from 'class-validator';
import { IsStrongPassword } from '../validators/strong-password.validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    message:
      'پسورد باید حداقل ۸ کاراکتر و شامل حرف بزرگ، حرف کوچک، عدد و نماد باشد',
  })
  password: string;
}
