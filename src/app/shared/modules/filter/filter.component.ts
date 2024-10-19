import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterField } from './models/filter-field';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filterFields: FilterField[] = [];
  @Output() onFilter = new EventEmitter<FilterField[]>();

  ngOnInit(): void {
    this.clearFilters(false);
  }

  filter() {
    this.onFilter.emit(this.filterFields.filter(x => x.value !== null));
  }

  clearFilters(emitCall:boolean = true) {
    this.filterFields.map(x => x.value = null);

    if (emitCall)
      this.onFilter.emit([]);
  }
}
