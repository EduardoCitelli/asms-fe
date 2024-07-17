import { RoleTypeEnum } from "../../enums/role-type.enum";
import { UserBasicWithPasswordDto } from "./user-basic-with-password-dto";

export interface UserCreateDto extends UserBasicWithPasswordDto {
  roles: RoleTypeEnum[];
}
