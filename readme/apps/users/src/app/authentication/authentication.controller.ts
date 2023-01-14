import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus, UsePipes, UseGuards, Request, Delete } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserRdo } from './rdo/create-user.rdo';
import { LoginUserRdo } from './rdo/login-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ShowUserRdo } from './rdo/show-user.rdo';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { createUserValidationScheme } from './validation-scheme/create-user.scheme';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { changeUserPasswordValidationScheme } from './validation-scheme/change-user-password.scheme';
import { RefreshJwtRdo } from './rdo/refresh-jwt.rdo';
import { RefreshJwtDto } from './dto/refresh-jwt.dto';
import { UserInterface } from '@readme/shared-types';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService
  ){}

  @Post('register')
  @ApiResponse({
    type: CreateUserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @UsePipes(new JoiValidationPipe<CreateUserDto>(createUserValidationScheme))
  public async register(@Body() createUserDto: CreateUserDto){
    const createdUser = await this.authenticationService.create(createUserDto);

    return fillObject(CreateUserRdo, createdUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(@Body() loginUserDto: LoginUserDto){
    const verifiedUser = await this.authenticationService.verify(loginUserDto);

    return this.authenticationService.createJwtTokens(verifiedUser);
  }

  @Post('refresh')
  @ApiResponse({
    type: LoginUserRdo,
    status: HttpStatus.OK,
    description: 'Tokens created successfully'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Refresh token is invalid.',
  })
  public async refreshJwtTokens(@Body() refreshJwtDto : RefreshJwtDto) : Promise<RefreshJwtRdo>{

    return this.authenticationService.updateJwtTokens(refreshJwtDto.userId, refreshJwtDto.refreshToken);
  }

  @Delete('logout')
  @ApiResponse({
    type: LoginUserRdo,
    status: HttpStatus.OK,
    description: 'Refresh token deleted successfully'
  })
  public async logout(@Body() logoutDto : {userId : string}) : Promise<UserInterface>{

    return this.authenticationService.clearRefreshToken(logoutDto.userId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: ShowUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authenticationService.getUser(id);

    return fillObject(ShowUserRdo, existUser);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('changepass')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: ShowUserRdo,
    status: HttpStatus.OK,
    description: 'Password changed successfully'
  })
  @UsePipes(new JoiValidationPipe<ChangeUserPasswordDto>(changeUserPasswordValidationScheme))
  public async changePassword(@Request() req, @Body() changeUserPasswordDto: ChangeUserPasswordDto) : Promise<void>{
    await this.authenticationService.changePassword(req.user.email, changeUserPasswordDto);
  }
}
