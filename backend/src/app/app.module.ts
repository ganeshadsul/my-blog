import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

const env = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${env}`,
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        BACKEND_PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'qa', 'staging', 'production')
          .default('development'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
