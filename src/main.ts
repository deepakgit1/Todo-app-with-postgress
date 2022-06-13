import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const port = 4000 || process.env.PORT
  await app.listen(port);
}
bootstrap();
