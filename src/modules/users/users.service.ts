import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { Model } from 'mongoose';
import { User} from './entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessException } from 'src/common/exceptions/business-exceptions';
import mongoose from 'mongoose';
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(){
    return await this.userModel.find();
  }

  async getUserById(id: mongoose.Types.ObjectId): Promise<User | undefined | null>{
    return await this.userModel.findById(id);
  }
  
  async findUserByEmail(email: string){
    return await this.userModel.findOne({email: email});
  }
  async createUser(createUserDto: CreateUserDto){

    const findUserByEmail = await this.userModel.findOne({ email: createUserDto.email})

    if(findUserByEmail){
      throw new BusinessException('User with this email already exists', 500)
    }

    return this.userModel.create(createUserDto);
  }

  deleteUser(id: mongoose.Types.ObjectId){
    return this.userModel.deleteOne({_id: id})
  }
}
