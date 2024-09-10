import { InstituteClassBlockListDto } from "./institute-class-block-list-dto";

export interface InstituteClassBlockCalendarDto extends InstituteClassBlockListDto {
  memberIds: number[];
  roomCapacity: number;
}
