import { Notification } from '@application/entities/notification/notification';

export class NotificationMapper {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
    };
  }
}
