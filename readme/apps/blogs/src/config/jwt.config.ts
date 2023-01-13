import { registerAs } from "@nestjs/config";

export const jwtConfig = registerAs('jwt-blogs', () => ({
  secret: process.env.JWT_SECRET,
}));
