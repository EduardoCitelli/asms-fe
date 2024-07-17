export interface InstituteClassUpdateDto {
  principalCoachId: number;
  auxCoachId?: number;
  roomId: number;
  description: string;
  startTime: string;
  minutesDuration: number;
}
