import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorsMiddleware } from 'middlewares/cors.middlewares';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forFeature([User, Strategy]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
