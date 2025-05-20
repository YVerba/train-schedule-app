import { Module } from '@nestjs/common';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { Train } from './train.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainController],
  providers: [TrainService],
  exports: [TrainService],
})
export class TrainModule {}
