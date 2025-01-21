import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    const userExists = await this.prisma.user.count({
      where: {
        email: user.email,
      },
    });

    if (userExists > 0) {
      throw new ConflictException('Usuário já cadastrado');
    }

    try {
      const createUser = await this.prisma.user.create({ data: user });
      return createUser;
    } catch (error: any) {
      throw new BadRequestException("erro ao criar usuário" + error.message);
    }
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    await this.findUserByid;
    const updateUser = await this.prisma.user.update({ where: { id: id }, data: user })
    return updateUser;
  }
  async deleteUser(id: string): Promise<User> {
    await this.findUserByid(id);
    const response = await this.prisma.user.delete({ where: { id: id } });
    return response;
  }
  getAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findUserByid(id: string): Promise<User> {
    try {
      const findedUser = await this.prisma.user.findUnique({ where: { id: id } });
      return findedUser!;

    } catch (error: any) {
      throw new NotFoundException("erro ao encontrar usuário: " + error.message);
    }
  }
}
