import { Body, Controller, Get } from '@nestjs/common';
import { CreateNotificationDto } from 'src/application/dtos/create-notification-dto';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(@Body() body: CreateNotificationDto) {
    const { category } = body;
    console.log(category);
    return;
  }
}
