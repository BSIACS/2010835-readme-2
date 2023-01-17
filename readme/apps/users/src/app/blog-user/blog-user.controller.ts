import { Controller, Get, HttpStatus, Param, Request, UseGuards, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlogUserService } from "./blog-user.service";
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthenticationGuard } from "../authentication/guards/jwt-authentication.guard";


@ApiTags('bloguser')
@Controller('bloguser')
export class BlogUserController {

  constructor(
    private readonly blogUserService: BlogUserService
  ){}

  @UseGuards(JwtAuthenticationGuard)
  @Get('/subscribe/:id')
  @UsePipes()
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Error in method <subscribe> invocation.',
  })
  public async subscribe(@Request() req, @Param('id', MongoidValidationPipe) id: string){

    return await this.blogUserService.createSubscription(req.user._id, id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/unsubscribe/:id')
  @UsePipes()
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Error in method <unsubscribe> invocation.',
  })
  public async unsubscribe(@Request() req, @Param('id', MongoidValidationPipe) id: string){

    return await this.blogUserService.cancelSubscription(req.user._id, id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/subscribers')
  @UsePipes()
  public async getSubscribers(@Request() req){

    return this.blogUserService.getSubscribers(req.user._id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/subscriptions')
  @UsePipes()
  public async getSubscriptions(@Request() req){

    return this.blogUserService.getSubscriptions(req.user._id);
  }
}
