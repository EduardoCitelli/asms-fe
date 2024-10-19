import { BasicEntityFilter } from "../basic-entity-filter";

export interface PaymentFilter extends BasicEntityFilter<number> {
  emittedDate: string;
  amount: number;
  paymentType: string;
  membershipPayment: MembershipPaymentFilter;
}

export interface MembershipPaymentFilter {
  instituteMember: InstituteMemberFilter;
}

export interface InstituteMemberFilter {
  user: UserFilter;
}

export interface UserFilter {
  firstName: string;
  lastName: string;
}
