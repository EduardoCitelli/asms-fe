import { NameDescriptionDto } from "../../name-description-dto";

export interface ActivityCreateDto extends NameDescriptionDto {
  memberMinQuantity?: number;
}
