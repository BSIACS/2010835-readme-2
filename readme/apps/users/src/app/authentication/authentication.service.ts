import { Injectable } from '@nestjs/common';
import { UnauthorizedException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from '@readme/shared-types';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';


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
    console.log(`existUser ===== ${existUser}`);

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

  public async loginUser(user: UserInterface) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname
    };
    console.log(`payload +++++ ${payload.sub}`);

    return {
      access_token: await this.jwtService.signAsync(payload),
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
}

