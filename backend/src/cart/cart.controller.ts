import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    // Tạo mới giỏ hàng hoặc thêm sản phẩm vào giỏ
    return this.cartService.addToCart(createCartDto);
  }

  @Get()
  findAll() {
    // Lấy tất cả các giỏ hàng (chỉ nên dùng cho admin/dev)
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Lấy 1 giỏ hàng theo id (nhớ ép kiểu về number)
    return this.cartService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    // Cập nhật giỏ hàng theo id
    return this.cartService.update(Number(id), updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Xóa giỏ hàng theo id
    return this.cartService.remove(Number(id));
  }
}
