import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { Model } from 'mongoose';
import { User} from './entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessException } from 'src/common/exceptions/business-exceptions';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(){
    return await this.userModel.find();
  }
  
  async createUser(createUserDto: CreateUserDto){

    const findUserByEmail = await this.userModel.findOne({ email: createUserDto.email})

    if(findUserByEmail){
      throw new BusinessException('User with this email already exists', 500)
    }

    return this.userModel.create(createUserDto);
  }
}
