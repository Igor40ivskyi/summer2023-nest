import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../user/user.entity';

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

  async validate(token: string): Promise<any> {
    let user: User;
    try {
      const payload = await this.jwtService.verify(token);
      user = await this.authService.validateUser(payload.id);
    } catch (e) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
    return user;
  }
}
