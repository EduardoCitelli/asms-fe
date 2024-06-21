import { PaymentDto } from "./payment-dto";

export interface PaymentCreateDto extends PaymentDto {
  instituteMemberId: number;
  updateByExpirationDate: boolean;
}
