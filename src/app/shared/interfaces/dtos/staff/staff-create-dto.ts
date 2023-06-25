import { UserBasicWithPasswordDto } from "../users/user-basic-with-password-dto";
import { StaffBasicDto } from "./staff-basic-dto";

export interface StaffCreateDto extends StaffBasicDto {
  user: UserBasicWithPasswordDto;
}
