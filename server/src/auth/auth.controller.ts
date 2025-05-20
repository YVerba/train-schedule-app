import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InputDto } from './dto/input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: InputDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: InputDto) {
    return this.authService.login(dto);
  }
}
