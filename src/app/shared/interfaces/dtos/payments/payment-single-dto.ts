import { PaymentListDto } from "./payment-list-dto";

export interface PaymentSingleDto extends PaymentListDto {
  membershipName: string;
  membershipTypeName: string;
}
