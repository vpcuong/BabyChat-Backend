import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/interfaces/guards/jwt-auth.guard';
import { GetAllUsersUseCase, GetUserByIdUseCase, DeleteUserUseCase } from 'src/modules/user/application/use-cases/get-users.usecase';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  getAllUsers() {
    return this.getAllUsersUseCase.execute();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
