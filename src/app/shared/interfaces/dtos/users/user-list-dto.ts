import { UserBasicDto } from "./user-basic-dto";

export interface UserListDto extends UserBasicDto {
  id: number;
  isEmailConfirmed: boolean;
  isBlocked: boolean;
}
