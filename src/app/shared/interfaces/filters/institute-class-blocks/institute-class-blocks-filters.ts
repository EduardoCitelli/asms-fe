import { BasicEntityFilter } from "../basic-entity-filter";

export interface InstituteClassBlockFilter extends BasicEntityFilter<number> {
  principalCoachId: number;
  header: HeaderInstituteClassFilter;
  startDateTime: string;
  finishDateTime: string;
  dayOfWeek: string;
  classStatus: string;
}

export interface HeaderInstituteClassFilter {
  description: string;
  isRecurrence: boolean;
}
