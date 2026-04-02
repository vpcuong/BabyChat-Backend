import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/domain/i-user.repository';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { UserNotFoundException } from 'src/shared/exceptions/domain-exceptions';

@Injectable()
export class GetAllUsersUseCase {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}

@Injectable()
export class GetUserByIdUseCase {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(id);
    return user;
  }
}

@Injectable()
export class DeleteUserUseCase {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(id);
    await this.userRepository.delete(id);
  }
}
