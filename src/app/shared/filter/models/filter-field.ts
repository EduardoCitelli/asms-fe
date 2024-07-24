import { Filter } from "../../interfaces/filters/filter";

export interface FilterField extends Filter {
  type: 'number' | 'string' | 'boolean' | 'date';
  description: string;
}
