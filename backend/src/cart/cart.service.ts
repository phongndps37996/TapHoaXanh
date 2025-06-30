import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async addToCart(createCartDto: CreateCartDto): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { users: { id: createCartDto.usersId } },
      relations: ['users', 'cartItem'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        users: { id: createCartDto.usersId },
        cartItem: [],
      });
      return await this.cartRepository.save(cart);
    }

    return cart;
  }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['users', 'cartItem'] });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['users', 'cartItem'],
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updatedCart = await this.cartRepository.preload({
      id,
      users: { id: updateCartDto.usersId },
    });

    if (!updatedCart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    return this.cartRepository.save(updatedCart);
  }
  async remove(id: number): Promise<{ message: string }> {
    await this.cartRepository.delete(id);
    return { message: 'Cart deleted successfully' };
  }
}
