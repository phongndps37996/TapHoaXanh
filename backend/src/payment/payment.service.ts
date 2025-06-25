import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined!');
    }
  }

  async createCharge(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { amount, currency, source, description } = createPaymentDto;

    try {
      const charge = await this.stripe.charges.create({
        amount: amount * 100,
        currency,
        source,
        description,
      });

      const payment = this.paymentRepository.create({
        amount,
        currency,
        description: description || '',
        stripeChargeId: charge.id,
        payment_method: 'stripe',
        payment_status: charge.status === 'succeeded' ? 'success' : 'failed',
        paid_at: new Date(charge.created * 1000),
      });

      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new InternalServerErrorException(`Thanh toán thất bại: ${error.message}`);
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) throw new NotFoundException(`Payment with id ${id} not found`);
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.preload({
      id,
      ...updatePaymentDto,
    });

    if (!payment) throw new NotFoundException(`Payment with id ${id} not found`);

    return this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Payment with id ${id} not found`);
  }
}