import { DayOfWeek } from "../../enums/day-of-week.enum";
import { InstituteClassUpdateDto } from "./institute-class-update-dto";

export interface InstituteClassCreateDto extends InstituteClassUpdateDto {
  activityId: number;
  isRecurrence: boolean;
  notRecurrenceDate?: string;
  fromRange?: string;
  toRange?: string;
  daysOfWeek?: DayOfWeek[];
}
