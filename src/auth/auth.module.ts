import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { NewdbModule } from 'src/newdb/newdb.module';

@Module({
  imports:[NewdbModule,
    TypeOrmModule.forFeature([UserAuth]),
    JwtModule.register({
      secret:'secre',
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
