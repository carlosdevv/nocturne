import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { CreateNotificationDto } from 'src/infra/http/dtos/create-notification-dto';
import { NotificationMapper } from '../mappers/notification-mapper';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification: NotificationMapper.toHttp(notification) };
  }
}
