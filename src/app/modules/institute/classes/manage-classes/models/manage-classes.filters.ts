import { FilterField } from "src/app/shared/modules/filter/models/filter-field";
import { InstituteClassFilter } from "src/app/shared/interfaces/filters/institute-classes/institute-classes-filters";
import { nameofFactory } from "src/app/shared/utils/nameof-proxy";

const nameofInstituteClassFilter = nameofFactory<InstituteClassFilter>();

export const manageClassesFilter: FilterField[] = [
  {
    type: 'string',
    field: nameofInstituteClassFilter.description,
    value: null,
    operator: 'contains',
    logic: 'and',
    description: 'Descripción',
  },
  {
    type: 'number',
    field: nameofInstituteClassFilter.roomId,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: 'Id de salon',
  },
  {
    type: 'number',
    field: nameofInstituteClassFilter.principalCoachId,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: 'Id de entrenador titular',
  },
  {
    type: 'number',
    field: nameofInstituteClassFilter.activityId,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: 'Id de actividad',
  },
]
