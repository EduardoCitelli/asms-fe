import { BasicEntityFilter } from "../basic-entity-filter";

export interface InstituteClassFilter extends BasicEntityFilter<number> {
  activityId: number;
  principalCoachId: number;
  auxCoachId: number;
  roomId: number;
  description: string;
  startTime: string;
  finishTime: string;
  isRecurrence: boolean;
  fromRange: string;
  toRange: string;
  daysOfWeek: string;
}
