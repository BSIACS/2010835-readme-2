import { Injectable } from '@nestjs/common';
import { UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, LOGOUT_ERROR } from './authentication.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from '@readme/shared-types';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { RefreshJwtRdo } from './rdo/refresh-jwt.rdo';


@Injectable()
export class AuthenticationService{
  constructor(
    private readonly repository : BlogUserRepository,
    private readonly jwtService : JwtService,
  ){}

  public async create(createUserDto: CreateUserDto){
    if(await this.repository.findByEmail(createUserDto.email)){
      throw new Error(AUTH_USER_EXISTS);
    }

    const {name, surname, email, password} = createUserDto;
    const user = {name, surname, email, passwordHash: '', avatar: '', registerDate: new Date(), postQuantity: 0, subscribersQuantity: 0};
    const userEntity = new BlogUserEntity(user);
    await userEntity.setPassword(password);

    return this.repository.create(userEntity);
  }

  public async verify(loginUserDto: LoginUserDto){
    const existUser = await this.repository.findByEmail(loginUserDto.email);

    if(!existUser){
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity(existUser);

    if(!userEntity.comparePassword(loginUserDto.password)){
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string){
    return this.repository.findById(id);
  }

  public async createJwtTokens(user: UserInterface) : Promise<RefreshJwtRdo>  {
    const accessTokenPayload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname
    };

    const refreshTokenPayload = {
      sub: user._id,
    }

    const accessToken = await this.jwtService.signAsync(accessTokenPayload);
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload);

    await this.repository.updateRefreshToken(user._id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  public async changePassword(email : string, changeUserPasswordDto : ChangeUserPasswordDto) : Promise<void>{
    const foundUser : UserInterface = await this.repository.findByEmail(email)

    if(!foundUser){
      throw new UnprocessableEntityException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = await new BlogUserEntity(foundUser);

    if(!userEntity.comparePassword(changeUserPasswordDto.oldPassword)){
      throw new UnprocessableEntityException(AUTH_USER_PASSWORD_WRONG);
    }

    await userEntity.setPassword(changeUserPasswordDto.newPassword);

    await this.repository.update(userEntity._id, userEntity);
  }

  public async updateJwtTokens(id : string, refreshToken : string) : Promise<RefreshJwtRdo>{
    let userId = '';

    try{
      const {sub} = await this.jwtService.verifyAsync(refreshToken);
      userId = sub;
    }
    catch{
      throw new UnauthorizedException();
    }

    if(userId !== id){
      throw new UnauthorizedException();
    }

    const foundUser = await this.repository.findById(userId);

    if(foundUser.refreshToken !== refreshToken){
      throw new UnauthorizedException();
    }

    return this.createJwtTokens(foundUser);
  }

  public async clearRefreshToken(userId : string) : Promise<UserInterface> {
    const operationResult = await this.repository.clearRefreshToken(userId);

    if(operationResult.refreshToken !== ''){
      throw new UnauthorizedException(LOGOUT_ERROR);
    }

    return operationResult
  }
}

