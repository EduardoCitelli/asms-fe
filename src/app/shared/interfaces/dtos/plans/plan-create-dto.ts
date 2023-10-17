import { PlanDto } from "./plan-dto";

export interface PlanCreateDto extends PlanDto {
  allowedUsers: number;
  hasOnlineClasses: boolean;
}
