import { PaymentType } from "./payment-type.enum";

export interface PaymentUpdateDto {
  id: number;
  paymentType: PaymentType;
}
