export interface JwtPayloadInterface {
  sub : string;
  email : string;
  name: string;
  surname: string;
  iat: number;
  exp: number;
}
