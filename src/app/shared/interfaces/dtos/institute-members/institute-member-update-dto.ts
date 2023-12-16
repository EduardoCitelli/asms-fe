import { UserBasicDto } from "../users/user-basic-dto";
import { InstituteMemberBasicDto } from "./institute-member-basic-dto";

export interface InstituteMemberUpdateDto extends InstituteMemberBasicDto {
  id: number;
  user: UserBasicDto;
}
