import { ComboDto } from "../combo-dto";

export enum RoleTypeEnum {
  SuperAdmin = 1,
  Manager,
  StaffMember,
  Coach,
  Member
}

/**
 * Use to get combo values for day of week
 * @returns Day of week combo values
 */
export function getRoleTypeCombo() : ComboDto<RoleTypeEnum>[] {
  let options = Object.values(RoleTypeEnum) as RoleTypeEnum[];
  let values = options.slice(options.length / 2);

  const response: ComboDto<RoleTypeEnum>[] = values.map(x => {
    return {
      id: x,
      name: RoleTypeEnum[x],
    }
  });

  return response;
}
