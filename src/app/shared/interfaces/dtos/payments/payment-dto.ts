import { PaymentType } from "./payment-type.enum";

export interface PaymentDto {
  amount: number;
  paymentType: PaymentType;
}
