import { HashPasswordPipe } from '@common/pipes/hash-password.pipe';
import { CreateUserDto } from '@dtos/create-user.dto';
import { UpdateUserDto } from '@dtos/update-user.dto';
import { Controller, Post, Body, Param, Delete, Get, HttpCode, UsePipes, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { AbstractUserRepository } from '@repositories/abstract-user.repository';
@Controller('/accounts')
export class UserController {
  constructor(private readonly userService: AbstractUserRepository) { }

  @Post('/create')
  @HttpCode(201)
  @UsePipes(HashPasswordPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const response = await this.userService.createUser(createUserDto)
    return response;
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const response = await this.userService.updateUser(id, updateUserDto);
    return response;
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string): Promise<string> {
    const response = await this.userService.deleteUser(id);
    const responseMessage = response ? `Usuário ${response.name} deletado ` : 'não foi possivel deletar o usuário';
    return responseMessage;
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    const response = await this.userService.findUserByid(id);
    return response;
  }
}
