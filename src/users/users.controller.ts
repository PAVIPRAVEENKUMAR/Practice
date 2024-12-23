import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {UsersService} from "./users.service";
import { User } from '../schemas/user.schema';
import { Types } from 'mongoose';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post()
    async create(@Body() user:User):Promise<User>{
        return this.usersService.create(user);
    }

    @Post('batch')
    async createBatch(@Body() users: User[]): Promise<User[]> {
    return this.usersService.createBatch(users);
    }
  
    @Get()
    async findAll():Promise<User[]>{
        return this.usersService.findAll();
    }

    @Get('older-than-25')
    async findOlderThan25() {
    return this.usersService.findUsersOlderThan25();
}
    @Get('find-by-name')
    async findByName(@Query('name') name: string) {
        return this.usersService.findByName(name);
    }

    @Get('findAndSortByAge')
    async findAndSortByAge(){
        return this.usersService.findAndSortByAge();
    }

    @Get('countUsers')
    async countUsers(){
        return this.usersService.countUsers();
    }

    @Get('groupByAge')
    async groupByAge(){
        return this.usersService.groupByAge();
    }

    @Get('getPaginatedUsers')

  async getPaginatedUsers(
    @Query('page') page: string, 
    @Query('pageSize') pageSize: string,
     )     {
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    if (isNaN(pageNumber) || isNaN(pageSizeNumber) || pageNumber < 1 || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid pagination parameters');
    }
    return this.usersService.getPaginatedUsers(pageNumber, pageSizeNumber);
         }

    @Get('sorted')
    async getSortedUsers(@Query('field') field: string, @Query('order') order: string) {
     return this.usersService.getSortedUsers(field, order as 'asc' | 'desc');
        }


    @Get('projected')
    async getUsersWithProjection(@Query('fields') fields: string) {
        return this.usersService.getUsersWithProjection(fields.split(','));
    }

    @Get('group-by-age')
async groupUsersByAge() {
  return this.usersService.groupUsersByAge();
}

    @Get('average-age')
async calculateAverageAge() {
  return this.usersService.calculateAverageAge();
}

@Get('group-older-users')
async groupOlderUsers() {
  return this.usersService.groupOlderUsers();
}


    @Get(':id')
    async findOne(@Param('id')id:string):Promise<User>{
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user ID');
          }
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id')id:string,@Body() user:Partial<User>):Promise<User>{
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user ID');
          }
        return this.usersService.update(id,user); 
    }

    @Delete(':id')
    async delete(@Param('id')id:string):Promise<User>{
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user ID');
          }
        return this.usersService.delete(id);
    } 
}