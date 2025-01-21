import { CreateUserDto } from '@dtos/create-user.dto';
import { UpdateUserDto } from '@dtos/update-user.dto';
import { Controller, Post, Body, Patch, Param, Delete, Get, HttpCode } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '@repositories/user.repository';



@Controller('/accounts')
export class UserController {
  constructor(private readonly userService: UserRepository) { }

  @Post('/register')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const response = await this.userService.createUser(createUserDto)
    return response;
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findUserByid(id);
  }
}
