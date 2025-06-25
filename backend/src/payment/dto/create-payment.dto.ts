import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

// Data Transfer Object (DTO) dùng để tạo mới một thanh toán
export class CreatePaymentDto {
  // Số tiền thanh toán (ví dụ: 100.00)
  @IsNumber()
  amount: number;

  // Đơn vị tiền tệ (ví dụ: 'usd', 'vnd')
  @IsString()
  @IsNotEmpty()
  currency: string;

  // Mã nguồn thanh toán (ví dụ: Stripe token hoặc payment method ID từ client)
  @IsString()
  @IsNotEmpty()
  source: string;

  // Mô tả chi tiết thanh toán (không bắt buộc)
  @IsOptional()
  @IsString()
  description?: string;
}
