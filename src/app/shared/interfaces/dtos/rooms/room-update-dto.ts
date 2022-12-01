import { RoomCreateDto } from "./room-create-dto";

export interface RoomUpdateDto extends RoomCreateDto {
  id: number;
}
