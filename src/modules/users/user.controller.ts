import { Controller, Post, Get, Query, Body, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto) {
    await this.userService.registerUser(createUserDto);
    return { message: 'Registration successful, please check your email for verification.' };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res: Response): Promise<any> {
    const result = await this.userService.verifyEmail(token);

    if (result) {
      return res.status(HttpStatus.OK).send({
        message: 'Email verified successfully! Welcome!',
      });
    }else{
      return res.status(HttpStatus.BAD_REQUEST).send({
      message:'Invalid verification link or expired token.',
    });
  }
}
}