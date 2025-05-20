import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from './train.entity';
import { TrainDto } from './dto/train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train)
    private readonly trainRepo: Repository<Train>,
  ) {}

  async getAll(): Promise<Train[]> {
    return this.trainRepo.find();
  }

  async getOne(id): Promise<Train> {
    const train = await this.trainRepo.findOneBy({ id });
    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }
    return train;
  }

  async create(dto: TrainDto): Promise<Train> {
    const train = this.trainRepo.create(dto);
    return this.trainRepo.save(train);
  }

  async updateAll(id: string, dto: TrainDto): Promise<Train> {
    const train = await this.getOne(id);
    Object.assign(train, dto);
    return this.trainRepo.save(train);
  }

  async update(id, dto: UpdateTrainDto): Promise<Train> {
    const train = await this.trainRepo.findOneBy({ id });
    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }
    Object.assign(train, dto);
    return this.trainRepo.save(train);
  }

  async delete(id: string): Promise<void> {
    const result = await this.trainRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }
  }
}
