import { PaymentDto } from "../payments/payment-dto";

export interface InstituteMemberMembershipCreateDto {
  instituteMemberId: number;
  membershipId: number;
  startDate: string;
  payment?: PaymentDto;
  activities?: number[];
}
