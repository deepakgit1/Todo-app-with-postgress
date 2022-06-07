import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './entities/auth.entity';



@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserAuth)
  private readonly userRepository: Repository<UserAuth>,
  ) { }

  async create(data: any): Promise<UserAuth> {
    //check if the user is already exist in db
    const { email } = data
    const userInDb = await this.userRepository.findOne({
      where: { email }
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.save(data)
  }

  async userLogin(data: any): Promise<UserAuth> {
    console.log(data);
    return this.userRepository.findOneBy(data)
  }

  findAll():Promise<UserAuth[]> {
    return this.userRepository.find()
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
