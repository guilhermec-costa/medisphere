import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error","warn", "log", "warn", "debug"]
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
