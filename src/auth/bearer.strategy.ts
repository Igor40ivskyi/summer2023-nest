import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretKey: process.env.JWT_SECRET_KEY || 'Secret',
    });
  }
}
