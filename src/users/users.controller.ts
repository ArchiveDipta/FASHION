import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Budi Santoso', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '08123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Jl. Merdeka No.1, Jakarta', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Lihat profil saya' })
  @ApiResponse({ status: 200, description: 'Data profil berhasil diambil' })
  @ApiResponse({ status: 401, description: 'Token tidak valid atau tidak ada' })
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update profil saya (nama, telepon, alamat)' })
  @ApiResponse({ status: 200, description: 'Profil berhasil diupdate' })
  @ApiResponse({ status: 401, description: 'Token tidak valid atau tidak ada' })
  updateProfile(@Request() req, @Body() body: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.userId, body);
  }
}
