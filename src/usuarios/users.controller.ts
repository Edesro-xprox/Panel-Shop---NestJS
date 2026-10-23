import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PatchUserDto } from './dto/patch-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

//   @Patch(':id')
//   patch(@Param('id') id: string, @Body() dto: PatchUserDto) {
//     return this.usersService.patch(id, dto);
//   }
}
