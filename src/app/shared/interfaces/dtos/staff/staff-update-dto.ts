import { UserBasicDto } from "../users/user-basic-dto";
import { StaffBasicDto } from "./staff-basic-dto";

export interface StaffUpdateDto extends StaffBasicDto {
  id: number;
  user: UserBasicDto;
}
