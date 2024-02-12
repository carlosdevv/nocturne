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

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const notificationMapper = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationMapper,
    });
  }

  async save(notification: Notification): Promise<void> {
    const notificationMapper = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: notificationMapper.id,
      },
      data: notificationMapper,
    });
  }
}
