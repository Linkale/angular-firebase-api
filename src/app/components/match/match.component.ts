import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { PandascoreService } from 'src/app/services/pandascore.service';
import { Match } from '../models/interfaces';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  match: Observable<Match>;
  
  constructor(private pandascore: PandascoreService, private routeActive: ActivatedRoute) {
    // Utilisation de la propriété "params" de "routeActive" pour récupérer les paramètres de l'URL
    // Utilisation de switchMap pour appeler la méthode "getMatchFromPandaScore" de notre service avec l'Id du match extrait des paramètres
    // Affectation du résultat à la variable "match" pour obtenir un observable de type Match
    this.match = this.routeActive.params.pipe(switchMap((params) =>this.pandascore.getMatchFromPandaScore(params['idMatch'])));
  }

  ngOnInit(): void { 
  }
}
