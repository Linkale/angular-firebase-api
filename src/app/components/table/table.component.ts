import { Component, Input } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { PandascoreService } from 'src/app/services/pandascore.service';
import { Match } from '../models/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  
  readonly type = new BehaviorSubject<string | undefined>(undefined);
  readonly data: Observable<Match[]>;

  @Input()
  set titleSpecial(titleSpecial: string) {
    this.type.next(titleSpecial)
  }
  
  constructor(private pandascore: PandascoreService) {
    this.data = this.type.pipe(
      filter((t): t is string => t !== undefined), 
      switchMap(title => this.pandascore.getDataFromPandaScore(title, '1', '50'))
    );
  }

  ngOnInit() {    
  }
}
