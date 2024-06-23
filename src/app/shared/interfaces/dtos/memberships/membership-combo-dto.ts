import { ComboDto } from "../../combo-dto";

export interface MembershipComboDto extends ComboDto<number> {
  isPremium: boolean;
  activityQuantity?: number;
}
