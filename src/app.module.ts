import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientController } from './client/client.controller';
import { ApiMiddleware } from './middleware/api.middleware';
import { ClientService } from './client/client.service';


@Module({
  imports: [],
  controllers: [AppController, ClientController],
  providers: [AppService, ClientService],
})
export class AppModule implements NestModule {
  configure(frontEnd: MiddlewareConsumer) {
    frontEnd.apply(ApiMiddleware).forRoutes({
      path: '/**', // For all routes
      method: RequestMethod.ALL, // For all methods
    });
  }
}
