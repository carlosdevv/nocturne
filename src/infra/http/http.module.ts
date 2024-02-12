import { CancelNotification } from '@application/usecases/cancel-notification';
import { CountRecipientNotifications } from '@application/usecases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';
import { ReadNotification } from '@application/usecases/read-notification';
import { SendNotification } from '@application/usecases/send-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
