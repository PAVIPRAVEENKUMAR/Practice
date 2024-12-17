import { Controller,Get, Param, Body, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {User} from './schemas/user.schema';
import {CreateUserDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor (private readonly usersService:UsersService){}

    @Get(':userId')
    async getuser(@Param('userId')userId: string):Promise<User>{
        return this.usersService.getUserById(userId);
    }

    @Get()
    async getUsers(): Promise<User[]>{
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto):Promise<User>{
        return this.usersService.createUser(createUserDto.email, createUserDto.age)
    }

    @Patch(':userId')
    async updateUser(@Param('userId')userId: string, @Body()updateUserDto:UpdateUserDto):Promise<User>{
        return this.usersService.updateUser(userId, updateUserDto);
    }
}