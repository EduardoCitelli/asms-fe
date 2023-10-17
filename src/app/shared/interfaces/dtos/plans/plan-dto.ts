import { NameDescriptionDto } from "../../name-description-dto";

export interface PlanDto extends NameDescriptionDto {
  price: number;
}
