import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { PandascoreService } from 'src/app/services/pandascore.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // BehaviorSubject pour stocker le type actuel (ex: "upcoming", "running") avec une valeur initiale non définie
  readonly type = new BehaviorSubject<string | undefined>(undefined);
  // BehaviorSubject pour stocker la page actuelle avec une valeur initiale de 0
  readonly page = new BehaviorSubject<number>(0);
  data: any;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: number[] = [5, 10, 15, 20];
  // Tableau des colonnes affichées dans la table
  displayedColumns: string[] = ['date', 'name', 'league', 'stage', 'status'];

  @Input()
  set titleSpecial(titleSpecial: string) {
    // Permet de mettre à jour la valeur du "type" avec la valeur spécifiée lors de l'appel du tableau
    this.type.next(titleSpecial)
  }
  
  constructor(private pandascore: PandascoreService, private router: Router) {
    // Combinaison des observables "page" et "type" en utilisant combineLatest
    // Filtrage des valeurs avec le type
    // Transformation des valeurs avec switchMap pour appeler la méthode "getMatchesFromPandaScore" de notre service
    // Utilisation de tap pour mettre à jour la variable "count" avec le total des matches
    // Utilisation de map pour extraire les matches de la réponse
    this.data = combineLatest([this.page, this.type])
    .pipe(
      filter(([_,t]) => t !== undefined), 
      switchMap(([page, title]) => this.pandascore.getMatchesFromPandaScore(title!, page+1, this.tableSize)),
      tap({next:({total}) => {this.count = total} }), map(({matches}) => matches)
    );
  }

  ngOnInit(): void { 
  }

  // Fonction appelée lorsqu'un événement de pagination se produit dans la table
  onTableDataChange(event: PageEvent): void {
    this.page.next(event.pageIndex);
  }

  // Fonction asynchrone pour naviguer vers une page de match spécifique via l'Id
  async goToMatch(idMatch: number) { 
    await this.router.navigateByUrl('/match/'+idMatch);
  }
}
