import { InstituteBasicDto } from "./institute-basic-dto";

export interface InstituteListDto extends InstituteBasicDto {
  id: number;
  isEnabled: boolean;
}
