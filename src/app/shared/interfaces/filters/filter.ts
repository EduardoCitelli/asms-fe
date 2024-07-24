export interface Filter {
  field: string;
  operator: "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "contains" | "startwith";
  value: any;
  logic: "and" | "or";
  filters?: Filter[];
}
