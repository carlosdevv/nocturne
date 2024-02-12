import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/notification';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
    };
  }

  static toDomain(dbNotification: PrismaNotification): Notification {
    return new Notification(
      {
        recipientId: dbNotification.recipientId,
        content: new Content(dbNotification.content),
        category: dbNotification.category,
        readAt: dbNotification.readAt,
        canceledAt: dbNotification.canceledAt,
        createdAt: dbNotification.createdAt,
      },
      dbNotification.id,
    );
  }
}
