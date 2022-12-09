import { MembershipCreateDto } from "./membership-create-dto";

export interface MembershipUpdateDto extends MembershipCreateDto {
  id: number;
}
