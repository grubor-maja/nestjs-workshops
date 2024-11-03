import { Module } from '@nestjs/common';
import { OrderItemModule } from './order-item/order-item.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderItem } from './order-item/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [OrderItem],
      synchronize: true,
    })
    ,OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
