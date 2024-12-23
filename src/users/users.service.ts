import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async createBatch(users: User[]): Promise<User[]> {
    return this.userModel.insertMany(users);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUsersOlderThan25(): Promise<User[]> {
    return this.userModel.find({ age: { $gt: 25 } }).exec();
  }

  async findByName(name: string): Promise<User> {
    return this.userModel.findOne({ name }).exec();
  }

  async findAndSortByAge(): Promise<User[]> {
    return this.userModel.find().sort({ age: -1 }).exec();
  }

async countUsers(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

async groupByAge(): Promise<User[]> {
  return this.userModel.aggregate([
    {
      $bucket: {
        groupBy: '$age', 
        boundaries: [20, 25, 30, 35, 40], 
        default: '40+',
        output: { count: { $sum: 1 }, users: { $push: '$$ROOT' } }
      }
    }
  ]);
}  

async getPaginatedUsers(page: number, pageSize: number): Promise<User[]> {
  const skip = (page - 1) * pageSize;
  return this.userModel.find().skip(skip).limit(pageSize).exec();
}

async getSortedUsers(sortField: string, sortOrder: 'asc' | 'desc'): Promise<User[]> {
  const allowedFields = ['name', 'age', 'email']; 
  if (!allowedFields.includes(sortField)) {
    throw new Error(`Invalid sort field: ${sortField}`);
  }
  const sort: { [key: string]: 1 | -1 } = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

    return this.userModel.find().sort(sort).exec();
}

async getUsersWithProjection(fields: string[]): Promise<User[]> {
  const projection = fields.join(' '); 
  return this.userModel.find({}, projection).exec();
}

async groupUsersByAge(): Promise<any> {
  return this.userModel.aggregate([
    { $group: { _id: '$age', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
}

async calculateAverageAge(): Promise<any> {
  return this.userModel.aggregate([
    { $group: { _id: null, averageAge: { $avg: '$age' } } }
  ]);
}

async groupOlderUsers(): Promise<any> {
  return this.userModel.aggregate([
    { $match: { age: { $gt: 25 } } }, 
    { $group: { _id: '$age', count: { $sum: 1 } } }, 
    { $sort: { count: -1 } }
  ]);
}

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }  
}