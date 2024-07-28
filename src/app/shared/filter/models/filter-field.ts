import { ComboDto } from "../../interfaces/combo-dto";
import { Filter } from "../../interfaces/filters/filter";

export interface FilterField extends Filter {
  type: 'number' | 'string' | 'boolean' | 'date' | 'combo';
  description: string;
  comboData?: ComboDto<any>[];
}
