import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AbstractUserRepository } from './abstract-user.repository';
import { User } from '@prisma/client';
import { UpdateUserDto } from '@dtos/update-user.dto';
import { PrismaService } from '@database/prisma.service';
import { CreateUserDto } from '@dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginatedResponse } from '@common/models/users.model';
import { SafeUser } from '@common/models/user-return-type';
@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async logIn(email: string, password: string): Promise<boolean> {
    const findedUser = await this.prisma.user.findFirst({ where: { email: email } });
    if (!findedUser) {
      throw new NotFoundException("Usuário não encontrado");
    }
    const isValidUser: boolean = await bcrypt.compare(password, findedUser.password);

    if (!isValidUser) {
      throw new InternalServerErrorException("Senha incorreta");
    }
    return isValidUser;
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

  async getUsersPaginated(page: number, limit: number): Promise<PaginatedResponse<SafeUser>> {
    const skip = (page - 1) * limit;

    try {
      const [users, totalCount] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        this.prisma.user.count(),
      ]);

      return {
        data: users,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Erro Prisma:', error);
      throw error;
    }
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
