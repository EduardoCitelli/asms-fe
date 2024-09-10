import { ComboDto } from "../combo-dto";

export enum ClassStatus {
  Pendiente = 1,
  Finalizada,
  Cancelada,
  Activa,
}

/**
 * Use to get combo values for class status
 * @returns Class status combo values
 */
export function getClassStatusCombo() : ComboDto<ClassStatus>[] {
  let options = Object.values(ClassStatus) as ClassStatus[];
  let values = options.slice(options.length / 2);

  const response: ComboDto<ClassStatus>[] = values.map(x => {
    return {
      id: x,
      name: ClassStatus[x],
    }
  });

  return response;
}
