import { NameDescriptionDto } from "../../name-description-dto";

export interface RoomCreateDto extends NameDescriptionDto {
  number: number;
  floor?: number;
  membersCapacity: number;
}
