import { Filter } from "./filter";

export class RootFilter {
  constructor(filter: Filter) {
    this.filters.push(filter);
  }

  logic: "and" | "or" = "and";
  filters: Filter[] = [];
}
