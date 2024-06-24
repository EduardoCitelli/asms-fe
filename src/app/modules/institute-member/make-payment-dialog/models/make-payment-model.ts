
export interface MakePaymentModel {
  instituteMemberId: number;
  memberName: string;
  remainingPayment: number;
  isForcePayment: boolean;
}
