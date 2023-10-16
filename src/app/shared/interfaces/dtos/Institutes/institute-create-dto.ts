import { PersonalInfoDto } from "../../personal-info-dto";
import { UserBasicWithPasswordDto } from "../users/user-basic-with-password-dto";
import { InstituteBasicDto } from "./institute-basic-dto";

export interface InstituteCreateDto extends InstituteBasicDto {
  personalInfo: PersonalInfoDto;
  user: UserBasicWithPasswordDto;
}
