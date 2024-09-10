import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterField } from './models/filter-field';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filterFields: FilterField[] = [];

  @Output() onFilter = new EventEmitter<FilterField[]>();

  filter() {
    this.onFilter.emit(this.filterFields.filter(x => x.value !== null));
  }

  clearFilters(){
    this.filterFields.map(x => x.value = null);
    this.onFilter.emit([]);
  }
}
