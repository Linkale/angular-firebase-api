import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Match } from '../components/models/interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PandascoreService {

  constructor(private http: HttpClient) { }

  // Fonction pour récupérer les matches à partir de l'API PandaScore
  getMatchesFromPandaScore(type: string, page: number, perPage: number) {
    let token = environment.pandascoreKey;
    let url = 'https://api.pandascore.co/'+type+'?filter[videogame]=3&sort=begin_at&page='+page+'&per_page='+perPage;
    // Définit les en-têtes de la requête avec le type de contenu et le jeton d'autorisation
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    })

    // Effectue une requête GET vers l'URL de PandaScore en utilisant HttpClient
    // et retourne les résultats sous forme d'observable
    return this.http.get<Match[]>(url, {headers: header, observe: 'response' as 'response'}).pipe(map((r: HttpResponse<Match[]>) => {
      // Effectue une transformation des résultats de la réponse en un objet avec la propriété "total" (total des matches) et "matches" (corps de la réponse)
      return {total: parseInt(r.headers.get('x-total')!), matches: r.body};
    })) ;
  }

  // Fonction pour récupérer un match spécifique à partir de PandaScore
  getMatchFromPandaScore(idMatch: string) {
    let token = environment.pandascoreKey;
    let url = 'https://api.pandascore.co/matches/'+idMatch;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<Match>(url, {headers: header});
  }
}
