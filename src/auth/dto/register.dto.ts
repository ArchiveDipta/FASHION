import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}