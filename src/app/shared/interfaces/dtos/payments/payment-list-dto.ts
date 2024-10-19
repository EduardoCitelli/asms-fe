import { PaymentDto } from "./payment-dto";

export interface PaymentListDto extends PaymentDto {
  id: number;
  emittedDate: string;
  payBy: string;
}
