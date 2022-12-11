import { UserBasicWithPasswordDto } from "../users/user-basic-with-password-dto";
import { CoachBasicDto } from "./coach-basic-dto";

export interface CoachCreateDto extends CoachBasicDto {
  user: UserBasicWithPasswordDto;
}
