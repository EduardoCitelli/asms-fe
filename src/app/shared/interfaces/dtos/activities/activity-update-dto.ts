import { ActivityCreateDto } from "./activity-create-dto";

export interface ActivityUpdateDto extends ActivityCreateDto {
  id: number;
}
