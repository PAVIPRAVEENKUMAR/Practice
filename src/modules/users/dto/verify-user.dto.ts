import {IsString, IsNotEmpty} from 'class-validator';

export class VerifyOtpDto{
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    otp:string;
}