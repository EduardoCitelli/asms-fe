import { RoleTypeEnum } from "../../enums/role-type-enum";
import { UserBasicDto } from "../users/user-basic-dto";

export interface AuthResponseDto extends UserBasicDto {
  token: string;
  roles: RoleTypeEnum[];
}
