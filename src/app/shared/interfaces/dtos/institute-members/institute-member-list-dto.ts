export interface InstituteMemberListDto {
  id: number;
  fullName: string;
  phone: string;
  needToPayMembership?: boolean;
  hasMembership: boolean;
}
