import { UserPersonalInfoDto } from "./user-personal-info.dto";

export interface UserBasicDto extends UserPersonalInfoDto {
  userName: string;
}
