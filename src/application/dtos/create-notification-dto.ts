import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: string;

  constructor(recipientId: string, content: string, category: string) {
    this.recipientId = recipientId;
    this.content = content;
    this.category = category;
  }
}
