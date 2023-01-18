import { ConfigService, registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

const JWT_LIFETIME = '900s';
const JWT_ALGORITHM = 'HS256';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));

export async function getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions>{
  return {
    secret: configService.get<string>('jwt.secret'),
    signOptions: { expiresIn: JWT_LIFETIME, algorithm: JWT_ALGORITHM},
  }
}
