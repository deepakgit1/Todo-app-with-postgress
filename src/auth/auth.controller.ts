import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
    private jwtService: JwtService
  ) { }

  //Get all user
  @Get("users")
  findAll() {
    return this.authService.findAll();
  }

  //Register user
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    let status = {
      success: true,
      message: 'user registered',
    };
    //hash password
    const hashPass = await bcrypt.hash(password, 12);
    await this.authService.create({
      name,
      email,
      password: hashPass
    })
    return status
  }

  //Login
  @Post('login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user: any = await this.authService.userLogin({ email });

    //Generate JWT token
    const token = this.jwtService.sign({ id: user.id })

    //check user is valid
    if (!user) {
      throw new BadRequestException('invalid credentials')
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials')
    }
    //Add token to user object
    const data = {
      ...user,
      token: token
    }
    return data
  }

  //Delete user
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
