import { DayOfWeek } from "../../enums/day-of-week.enum";

export interface InstituteClassListDto {
  id: number;
  description: string;
  startTime: string;
  finishTime: string;
  fromRange?: string;
  toRange?: string;
  daysOfWeek?: DayOfWeek[];
}
