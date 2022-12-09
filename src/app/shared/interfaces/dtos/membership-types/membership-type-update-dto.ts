import { MembershipTypeCreateDto } from "./membership-type-create-dto";

export interface MembershipTypeUpdateDto extends MembershipTypeCreateDto {
  id: number;
}
