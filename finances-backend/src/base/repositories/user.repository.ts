import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AbstractUserRepository } from './abstract-user.repository';
import { User } from '@prisma/client';
import { UpdateUserDto } from '@dtos/update-user.dto';
import { PrismaService } from '@database/prisma.service';
import { CreateUserDto } from '@dtos/create-user.dto';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(private readonly prisma: PrismaService) { }
  logIn(email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.' + email + password);
  }
  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const createUser = await this.prisma.user.create({ data: user });
      return createUser;
    } catch {
      throw new BadRequestException("erro ao criar usuário");
    }
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    await this.findUserByid;
    const updateUser = await this.prisma.user.update({ where: { id: id }, data: user })
    return updateUser;
  }
  async deleteUser(id: string): Promise<User> {
    try {
      const response = await this.prisma.user.delete({ where: { id: id } });
      return response;
    } catch {
      throw new BadRequestException("Erro ao deletar usuário");
    }
  }
  getAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findUserByid(id: string): Promise<User> {
    try {
      const findedUser = await this.prisma.user.findUnique({ where: { id: id } });
      return findedUser!;

    } catch {
      throw new NotFoundException("erro ao encontrar usuário ");
    }
  }
}
