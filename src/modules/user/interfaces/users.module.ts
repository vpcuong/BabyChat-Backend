import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserDocument, UserSchema } from 'src/modules/user/infrastructure/user.schema';
import { UserRepository } from 'src/modules/user/infrastructure/user.repository';
import { IUserRepository } from 'src/modules/user/domain/i-user.repository';
import {
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  DeleteUserUseCase,
} from 'src/modules/user/application/use-cases/get-users.usecase';

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
