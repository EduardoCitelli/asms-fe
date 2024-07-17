import { ClassStatus } from "../../enums/class-status.enum";
import { DayOfWeek } from "../../enums/day-of-week.enum";

export interface InstituteClassBlockListDto {
  id: number;
  description: string;
  principalCoachName: string;
  startDateTime: string;
  finishDateTime: string;
  dayOfWeek: DayOfWeek;
  classStatus: ClassStatus;
}
