import { UserBasicDto } from "./user-basic-dto";

export interface UserBasicWithPasswordDto extends UserBasicDto {
  password: string;
}
