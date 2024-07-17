import { InstituteClassBlockListDto } from "./institute-class-block-list-dto";

export interface InstituteClassBlockSingleDto extends InstituteClassBlockListDto {
  auxCoachName?: string;
  roomName: string;
  activityName: string;
}
