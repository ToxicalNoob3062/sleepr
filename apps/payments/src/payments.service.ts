import { Inject, Injectable } from '@nestjs/common';
import { Stripe } from "stripe";
import { ConfigService } from '@nestjs/config';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dtos/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
    apiVersion: "2022-11-15"
  });
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy
  ) { }
  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card
    });
    const paymentIntend = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ["card"],
      currency: "usd"
    });

    this.notificationsService.emit("notify_email", { email, text: `⚡😎 Successfully paid ${amount}$ 💰 for your reservation! 💖🥰` });
    return paymentIntend;
  }
}
