export interface CreateUserProps {
  username: string;
  email: string;
  password: string; // already hashed
  displayName?: string;
  dateOfBirth?: Date;
}

export class UserEntity {
  readonly id?: string;
  readonly username: string;
  readonly email: string;
  readonly password: string; // hashed
  readonly displayName?: string;
  readonly dateOfBirth?: Date;
  readonly createdAt: Date;

  private constructor(props: {
    id?: string;
    username: string;
    email: string;
    password: string;
    displayName?: string;
    dateOfBirth?: Date;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.displayName = props.displayName;
    this.dateOfBirth = props.dateOfBirth;
    this.createdAt = props.createdAt;
  }

  static create(props: CreateUserProps): UserEntity {
    if (!props.username || props.username.trim().length === 0) {
      throw new Error('Username is required');
    }
    if (!props.email || props.email.trim().length === 0) {
      throw new Error('Email is required');
    }
    if (!props.password) {
      throw new Error('Password is required');
    }

    return new UserEntity({
      id: undefined, // assigned by persistence layer
      username: props.username.trim(),
      email: props.email.toLowerCase().trim(),
      password: props.password,
      displayName: props.displayName,
      dateOfBirth: props.dateOfBirth,
      createdAt: new Date(),
    });
  }

  static reconstitute(props: {
    id?: string;
    username: string;
    email: string;
    password: string;
    displayName?: string;
    dateOfBirth?: Date;
    createdAt: Date;
  }): UserEntity {
    return new UserEntity(props);
  }
}
