import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { UserController } from '@controllers/user.controller';
import { AbstractUserRepository } from '@repositories/abstract-user.repository';
import { UserRepository } from '@repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [{ provide: AbstractUserRepository, useClass: UserRepository },
  ],
  exports: [AbstractUserRepository],
})
export class UserModule { }
