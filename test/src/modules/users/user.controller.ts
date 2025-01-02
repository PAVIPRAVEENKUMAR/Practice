import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    await this.userService.registerUser(email, password, name);
    return { message: 'Registration successful, please check your email for verification.' };
  }

  //@Get('verify-email')
  //async verifyEmail(@Query('token') token: string, @Res() res: Response): Promise<any> {
    //const result = await this.userService.verifyEmail(token);

    //if (result) {
      //return res.status(HttpStatus.OK).send({
        //message: 'Email verified successfully! Welcome!',
      //});
    //}else{
      //return res.status(HttpStatus.BAD_REQUEST).send({
      //message:'Invalid verification link or expired token.',
    //});
  //}
//}

@Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    const { email, otp } = body;
    const result = await this.userService.verifyOtp(email, otp);
    if (result) {
      return { message: 'OTP verified successfully!' };
    }
    return { message: 'Invalid or expired OTP.' };
  }
}