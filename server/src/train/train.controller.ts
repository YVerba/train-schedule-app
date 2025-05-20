import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainDto } from './dto/train.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTrainDto } from './dto/update-train.dto';

@Controller('train')
// @UseGuards(AuthGuard('jwt'))
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  getAll() {
    return this.trainService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trainService.getOne(id);
  }

  @Post()
  create(@Body() dto: TrainDto) {
    return this.trainService.create(dto);
  }

  @Put(':id')
  updateAll(@Param('id') id: string, @Body() dto: TrainDto) {
    return this.trainService.updateAll(id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrainDto) {
    return this.trainService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.trainService.delete(id);
  }
}
