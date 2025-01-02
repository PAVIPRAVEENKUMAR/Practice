import { Injectable} from '@nestjs/common';
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
    const otp = this.generateOtp(); 
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    const user = new this.userModel({
      name,
      email,
      password,
      otp,
      otpExpires: expiresIn, 
    });
    await user.save();  

    await this.emailService.sendOtpEmail(email,otp, name); 
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user || user.otp !== otp) {
      throw new Error('Invalid OTP');
    }
    if (new Date() > user.otpExpires) {
      throw new Error('OTP has expired');
    }
    user.isVerified = true;
    user.otp = null; 
    user.otpExpires = null; 
    await user.save();
    return true;  
 }
}