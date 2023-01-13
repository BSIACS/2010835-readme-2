import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadInterface } from '@readme/shared-types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt-blogs.secret')
    });
  }

  async validate({ sub, email, name, surname}: Pick<JwtPayloadInterface, 'sub' | 'email' | 'name' | 'surname'>) {

    return { _id: sub, email, name, surname };
  }
}
