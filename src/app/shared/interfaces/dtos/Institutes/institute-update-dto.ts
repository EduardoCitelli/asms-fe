import { PersonalInfoDto } from "../../personal-info-dto";
import { InstituteBasicDto } from "./institute-basic-dto";

export interface InstituteUpdateDto extends InstituteBasicDto {
  personalInfo: PersonalInfoDto;
}
