import { CancelNotification } from '@application/usecases/cancel-notification';
import { CountRecipientNotifications } from '@application/usecases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { CreateNotificationDto } from 'src/infra/http/dtos/create-notification-dto';
import { NotificationMapper } from '../mappers/notification-mapper';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotification: GetRecipientNotifications,
  ) {}

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationMapper.toHttp) };
  }

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
