import { UserBasicDto } from "../users/user-basic-dto";
import { CoachBasicDto } from "./coach-basic-dto";

export interface CoachUpdateDto extends CoachBasicDto {
  id: number;
  user: UserBasicDto;
}
