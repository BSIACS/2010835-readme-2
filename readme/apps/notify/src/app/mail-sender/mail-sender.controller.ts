import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MailSenderService } from "./mail-sender.service";

@Controller('notify')
@ApiTags('MailSender')
export class MailSenderController{
  constructor(
    private readonly mailSender : MailSenderService
  ){}

  @Get('/index')
  public async index(){
    this.mailSender.sendNotifications();
  }
}
