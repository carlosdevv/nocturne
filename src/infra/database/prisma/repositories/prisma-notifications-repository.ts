import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificatioId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificatioId,
      },
    });

    if (!notification) return null;

    const notificationEntity = new Notification({
      category: notification.category,
      content: new Content(notification.content),
      createdAt: notification.createdAt,
      recipientId: notification.recipientId,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt,
    });

    return notificationEntity;
  }

  async create(notification: Notification): Promise<void> {
    const notificationMapper = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationMapper,
    });
  }

  async save(notification: Notification): Promise<void> {
    const notificationMapper = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationMapper,
    });
  }
}
