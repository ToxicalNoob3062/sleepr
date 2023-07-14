import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dtos/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail({ email }: NotifyEmailDto) {
    console.log(email);
  }
}
