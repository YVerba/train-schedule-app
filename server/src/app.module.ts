import { Module } from '@nestjs/common';
import { TrainModule } from './train/train.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TrainModule,
    AuthModule,
  ],
})
export class AppModule {}
