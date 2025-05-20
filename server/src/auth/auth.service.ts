import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InputDto } from './dto/input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.signAsync(payload);
  }

  async signup({ email, password }: InputDto) {
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userModel.create({ email, password: hashedPassword });
    await this.userModel.save(user);

    const token = await this.signToken(user.id, user.email);
    return { accessToken: token };
  }

  async login({ email, password }: InputDto) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.signToken(user.id, user.email);
    return { accessToken: token };
  }
}
