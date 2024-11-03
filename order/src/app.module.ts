import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Order } from './order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Order],
      synchronize: true,
    })
    ,OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
