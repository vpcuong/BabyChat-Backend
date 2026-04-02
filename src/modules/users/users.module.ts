import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserDocument, UserSchema } from 'src/infrastructure/persistence/schemas/user.schema';
import { UserRepository } from 'src/infrastructure/persistence/repositories/user.repository';
import { IUserRepository } from 'src/domain/user/repositories/i-user.repository';
import {
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  DeleteUserUseCase,
} from 'src/application/user/use-cases/get-users.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    { provide: IUserRepository, useClass: UserRepository },
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
  ],
  exports: [IUserRepository],
})
export class UserModule {}
