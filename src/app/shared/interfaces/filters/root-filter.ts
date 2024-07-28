import { Filter } from "./filter";

export class RootFilter {
  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  logic: "and" | "or" = "and";
  filters: Filter[] = [];
}
