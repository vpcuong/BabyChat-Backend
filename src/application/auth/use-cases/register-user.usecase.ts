import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from 'src/domain/user/repositories/i-user.repository';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { UserAlreadyExistsException } from 'src/common/exceptions/domain-exceptions';
import { IEventBus, EVENT_BUS } from 'src/infrastructure/events/event-bus';
import { UserCreatedEvent } from 'src/domain/user/events/user-created.event';

export interface RegisterUserCommand {
  email: string;
  password: string;
  username: string;
}

export interface AuthTokenResult {
  access_token: string;
  refresh_token: string;
  user: { id?: string; email: string; username: string };
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(EVENT_BUS) private readonly eventBus: IEventBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<AuthTokenResult> {
    const alreadyExists = await this.userRepository.existsByEmail(command.email);
    if (alreadyExists) {
      throw new UserAlreadyExistsException(command.email);
    }

    const hashedPassword = await bcrypt.hash(command.password, 10);

    const user = UserEntity.create({
      email: command.email,
      password: hashedPassword,
      username: command.username,
    });

    const savedUser = await this.userRepository.save(user);

    this.eventBus.publish(
      new UserCreatedEvent(savedUser.id ?? '', savedUser.email, savedUser.username),
    );

    const payload = { email: savedUser.email, sub: savedUser.id, username: savedUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: { id: savedUser.id, email: savedUser.email, username: savedUser.username },
    };
  }
}
