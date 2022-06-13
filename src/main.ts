import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const port = 4000 || "https://todo-app-backend-server.herokuapp.com/"
  await app.listen(port);
}
bootstrap();
