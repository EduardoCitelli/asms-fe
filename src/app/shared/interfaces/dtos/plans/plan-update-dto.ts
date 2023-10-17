import { PlanCreateDto } from "./plan-create-dto";

export interface PlanUpdateDto extends PlanCreateDto {
  id: number;
}
