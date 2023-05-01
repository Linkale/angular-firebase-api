import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Match } from '../components/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PandascoreService {

  constructor(private http: HttpClient) { }

  getDataFromPandaScore(type: string, page: string, perPage: string) {
    console.log(type)
    let token = environment.pandascoreKey;
    let url = 'https://api.pandascore.co/'+type+'?filter[videogame]=3&sort=begin_at&page='+page+'&per_page='+perPage;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<Match[]>(url, {headers: header});
  }
}
