import { CreateUserDto } from "@dtos/create-user.dto";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { User } from "@prisma/client";

export abstract class AbstractUserRepository {
    abstract createUser(createUserDto: CreateUserDto): Promise<User>;
    abstract updateUser(id: string, user: UpdateUserDto): Promise<User>;
    abstract deleteUser(id: string): Promise<User>;
    abstract getAllUsers(): Promise<User[]>;
    abstract findUserByid(id: string): Promise<User>;
    abstract logIn(email: string, password: string): Promise<User>;

}