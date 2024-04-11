import { UpdateMyUserDto } from "../my-user/update-my-user-dto";

export interface UserUpdateDto extends UpdateMyUserDto {
  id: number;
}
