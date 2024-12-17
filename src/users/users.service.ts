import { Injectable } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {UpdateUserDto} from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository:UserRepository){}

    async getUserById(userId:string):Promise<User>{
        return this.userRepository.findOne({userId})
    }
    async getUsers():Promise<User[]>{
        return this.userRepository.find({});
    }
    async createUser(email: string, age: number):Promise<User>{
        return this.userRepository.create({
            userId:uuidv4(),
            email,
            age,
            favoriteFoods:[]
        })
    }
    async updateUser(userId: string, userUpdates:UpdateUserDto):Promise<User>{
        return this.userRepository.findOneAndUpdate({userId}, userUpdates);
    }
}