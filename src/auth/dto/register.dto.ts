import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email pengguna',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password minimal 6 karakter',
  })
  @IsString()
  @MinLength(6)
  password: string;
}