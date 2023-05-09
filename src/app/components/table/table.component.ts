import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = ['date', 'name', 'league', 'stage', 'status'];

  @Input()
  set titleSpecial(titleSpecial: string) {
    this.type.next(titleSpecial)
  }
  
  constructor(private pandascore: PandascoreService, private router: Router) {
    this.data = combineLatest([this.page, this.type])
    .pipe(
      filter(([_,t]) => t !== undefined), 
      switchMap(([page, title]) => this.pandascore.getMatchesFromPandaScore(title!, page+1, this.tableSize)),
      tap({next:({total}) => {this.count = total} }), map(({matches}) => matches)
    );
  }

  ngOnInit(): void { 
  }

  onTableDataChange(event: PageEvent): void {
    this.page.next(event.pageIndex);
  }

  async goToMatch(idMatch: number) { 
    await this.router.navigateByUrl('/match/'+idMatch);
  }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getArrayOfMatches();
  // }
}
