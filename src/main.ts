import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const port = "https://todo-app-backend-server.herokuapp.com/" || 4000
  await app.listen(port);
}
bootstrap();
