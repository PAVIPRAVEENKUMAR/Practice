import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { EmailService } from '../emails/emails.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly emailService: EmailService,  
  ) {}
  
  async registerUser(email: string, password: string, name:string): Promise<void> {
    const user = await this.userModel.findOne({email});
    if(user){
      throw new BadRequestException('User already exists');
    }
    const otp = this.generateOtp(); 
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    const newUser = new this.userModel({
      name,
      email,
      password,
      otp,
      otpExpires: expiresIn, 
    });
    try{
      await newUser.save();
    }catch(error){
      throw new HttpException('Error in registering user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    await this.emailService.sendOtpEmail(email,otp, name); 
  }

private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async verifyOtp(email: string, otp: string): Promise<boolean> {
  
  const user = await this.userModel.findOne({ email });
    if (!user ){
      throw new NotFoundException('User not Found');
    }
    if(user.isVerified) {
      throw new HttpException('User is already verified', HttpStatus.BAD_REQUEST);
    }
    if(user.otp!==otp){
      throw new BadRequestException('Invalid OTP');
    }
    if (new Date() > user.otpExpires) {
      throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
    }
    user.isVerified = true;
    user.otp = null; 
    user.otpExpires = null; 
    await user.save();
    return true;  
 }
}