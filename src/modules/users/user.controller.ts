import { Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyOtpDto } from './dto/verify-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    try{
    await this.userService.registerUser(email, password, name);
    return { message: 'Registration successful, please check your email for verification.' };
    }catch(error){
      throw new HttpException('Failed to register the user',HttpStatus.BAD_REQUEST);
    }
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
  async verifyOtp(@Body() verifyuserDto:VerifyOtpDto) {
    const { email, otp } = verifyuserDto;
    try{

    const result = await this.userService.verifyOtp(email, otp);
    if (result) {
      return { message: 'OTP verified successfully!' };
    }
  }catch(error){
    throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
}