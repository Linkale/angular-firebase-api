import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { PandascoreService } from 'src/app/services/pandascore.service';
import { Match } from '../models/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  
  readonly type = new BehaviorSubject<string | undefined>(undefined);
  readonly page = new BehaviorSubject<number>(0);
  data: any;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: number[] = [5, 10, 15, 20];
  displayedColumns: string[] = ['name', 'tournament', 'status'];

  @Input()
  set titleSpecial(titleSpecial: string) {
    this.type.next(titleSpecial)
  }
  
  constructor(private pandascore: PandascoreService) {
    this.data = combineLatest([this.page, this.type])
    .pipe(
      filter(([_,t]) => t !== undefined), 
      switchMap(([page, title]) => this.pandascore.getDataFromPandaScore(title!, page+1, this.tableSize)),
      tap({next:({total}) => {this.count = total} }), map(({matches}) => matches)
    );
  }

  ngOnInit(): void { 
  }

  onTableDataChange(event: PageEvent) {
    this.page.next(event.pageIndex);
  }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getArrayOfMatches();
  // }
}
