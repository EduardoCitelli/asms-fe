import { UserBasicWithPasswordDto } from "../users/user-basic-with-password-dto";
import { InstituteMemberBasicDto } from "./institute-member-basic-dto";

export interface InstituteMemberCreateDto extends InstituteMemberBasicDto {
  user: UserBasicWithPasswordDto;
}
