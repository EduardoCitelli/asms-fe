import { FilterField } from "src/app/shared/filter/models/filter-field";
import { getClassStatusCombo } from "src/app/shared/interfaces/enums/class-status.enum";
import { HeaderInstituteClassFilter, InstituteClassBlockFilter } from "src/app/shared/interfaces/filters/institute-class-blocks/institute-class-blocks-filters";
import { nameofFactory } from "src/app/shared/utils/nameof-proxy";

const nameofInstituteClassBlockFilter = nameofFactory<InstituteClassBlockFilter>();
const nameOfHeaderInstituteClassFilter = nameofFactory<HeaderInstituteClassFilter>();

export const manageBlocksFilterFields: FilterField[] = [
  {
    type: 'string',
    field: `${nameofInstituteClassBlockFilter.header}.${nameOfHeaderInstituteClassFilter.description}`,
    value: null,
    operator: 'contains',
    logic: 'and',
    description: 'Descripción',
  },
  {
    type: 'number',
    field: nameofInstituteClassBlockFilter.principalCoachId,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: 'Id de entrenador titular',
  },
  {
    type: 'combo',
    field: nameofInstituteClassBlockFilter.classStatus,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: 'Estado',
    comboData: getClassStatusCombo(),
  },
  {
    type: 'date',
    field: nameofInstituteClassBlockFilter.startDateTime,
    value: null,
    operator: 'gt',
    logic: 'and',
    description: 'Desde',
  },
  {
    type: 'date',
    field: nameofInstituteClassBlockFilter.startDateTime,
    value: null,
    operator: 'lt',
    logic: 'and',
    description: 'Hasta',
  },
  {
    type: 'boolean',
    field: `${nameofInstituteClassBlockFilter.header}.${nameOfHeaderInstituteClassFilter.isRecurrence}`,
    value: null,
    operator: 'eq',
    logic: 'and',
    description: '¿Es una clase recurrente?',
  },
]
