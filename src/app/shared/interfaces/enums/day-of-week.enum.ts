import { ComboDto } from "../combo-dto";

export enum DayOfWeek {
  Domingo = 0,
  Lunes,
  Martes,
  Miercoles,
  Jueves,
  Viernes,
  Sabado,
}

/**
 * Use to get combo values for day of week
 * @returns Day of week combo values
 */
export function getDayOfWeekCombo() : ComboDto<DayOfWeek>[] {
  let options = Object.values(DayOfWeek) as DayOfWeek[];
  let values = options.slice(options.length / 2);

  const response: ComboDto<DayOfWeek>[] = values.map(x => {
    return {
      id: x,
      name: DayOfWeek[x],
    }
  });

  return response;
}
