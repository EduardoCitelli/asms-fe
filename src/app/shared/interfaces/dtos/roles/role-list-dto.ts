import { RoleTypeEnum } from "../../enums/role-type-enum";
import { RoleBasicDto } from "./role-basic-dto";

export interface RoleListDto extends RoleBasicDto {
  id: RoleTypeEnum;
}
