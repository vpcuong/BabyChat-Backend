import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/interfaces/guards/jwt-auth.guard';
import { GetAllUsersUseCase, GetUserByIdUseCase, DeleteUserUseCase } from 'src/modules/user/application/use-cases/get-users.usecase';

@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Lấy danh sách tất cả users' })
  @Get()
  getAllUsers() {
    return this.getAllUsersUseCase.execute();
  }

  @ApiOperation({ summary: 'Lấy user theo ID' })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Xóa user theo ID' })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
