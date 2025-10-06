import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Post, Param} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){

  }

  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: mongoose.Types.ObjectId){
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto){
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: mongoose.Types.ObjectId){
    return await this.userService.deleteUser(id);
  }
}
