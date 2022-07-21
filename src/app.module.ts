import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/porducts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb+srv://piyush:piyush_123@cluster0.pbgl1.mongodb.net/test_nestjs')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


