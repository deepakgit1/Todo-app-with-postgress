import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from 'src/auth/entities/auth.entity';
import { Todo } from 'src/todos/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: ".env"
      }
    )],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get("DB_HOST"),
      port: +configService.get("DB_PORT"),
      username: configService.get("DB_USERNAME"),
      password: configService.get("DB_PASSWORD"),
      database: configService.get("DB_DATABASE"),
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        },
      },
      entities: [UserAuth, Todo],
      synchronize: true,
    }),
    inject: [ConfigService],
  })]

})
export class NewdbModule { }
