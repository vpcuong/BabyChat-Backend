import { UsersService } from './users.service';
import { Body, Controller, Get, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){

  }

  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto);
  }
}
