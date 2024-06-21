import { NameDescriptionDto } from "../../name-description-dto";

export interface MembershipCreateDto extends NameDescriptionDto {
  membershipTypeId: number;
  isPremium: boolean;
  price: number;
  activityQuantity?: number;
}
