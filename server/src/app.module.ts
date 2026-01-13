import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';
import { ResponseInterceptor } from './common/interceptors/ResponseInterceptor';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { validationSchema } from './config/env/validation.schema';
import { LogsService } from './common/utils/logsUtil/logs.service';
import { LogsModule } from './common/utils/logsUtil/logs.module';
import { UtilsModule } from './common/utils/utils.module';
import { CosModule } from './modules/cos/cos.module';
import { FoodModule } from './modules/food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        // 1. 公共配置文件（所有环境共享）
        path.resolve(process.cwd(),
          'src',
          'config',
          'env',
          '.env'
        ),
        // 2. 环境专属配置文件（保留你的原有逻辑，规范路径拼接）
        path.resolve(
          process.cwd(),
          'src',
          'config',
          'env',
          `.env.${process.env.NODE_ENV || 'development'}`,
        ),
      ],
      isGlobal: true,
      validationSchema,
      expandVariables: true,
    }),
    LogsModule,
    UtilsModule,
    CosModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [
    LogsService,
    AppService,
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class AppModule { }