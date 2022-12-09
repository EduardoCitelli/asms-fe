import { NameDescriptionDto } from "../../name-description-dto";

export interface MembershipTypeCreateDto extends NameDescriptionDto {
  isByQuantity: boolean;
  monthQuantity: number;
  classQuantity?: number;
}
