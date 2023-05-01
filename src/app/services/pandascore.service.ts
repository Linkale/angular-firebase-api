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

  getDataFromPandaScore(type: string, page: number, perPage: number) {
    let token = environment.pandascoreKey;
    let url = 'https://api.pandascore.co/'+type+'?filter[videogame]=3&sort=begin_at&page='+page+'&per_page='+perPage;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<Match[]>(url, {headers: header, observe: 'response' as 'response'}).pipe(map((r: HttpResponse<Match[]>) => {
      return {total: parseInt(r.headers.get('x-total')!), matches: r.body};
    })) ;
  }
}
