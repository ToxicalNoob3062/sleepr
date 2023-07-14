import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dtos/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @EventPattern("notify_email")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    console.log("message-received");
    this.notificationsService.notifyEmail(data);
  }
}
