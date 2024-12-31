import { ConflictException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { EmailService } from '../emails/emails.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly emailService: EmailService, 
  ) {}
 
  async registerUser(createUserDto: CreateUserDto): Promise<void> {

    const {email, name, password}=createUserDto;
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const verificationToken = jwt.sign({ email },'your_hardcoded_secret_key', { expiresIn: '24h' });

    const newUser = new this.userModel({
      name,
      email,
      password,  
      isVerified: false,
      verificationToken,
    });
    await newUser.save();

    await this.emailService.sendVerificationEmail(email, name, verificationToken);
  }

  async verifyEmail(token: string): Promise<boolean> {
    
    const user = await this.userModel.findOne({ verificationToken: token }).exec();

    if (!user) {
      return false; 
    }

    if (new Date() > user.verificationExpires) {
      return false; 
    }
   
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationExpires = null; 
    await user.save();

    await this.emailService.sendWelcomeEmail(user.email, user.name);
    return true; 
  }
}