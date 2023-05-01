import { Component } from '@angular/core';
import { 
  Firestore, collection, addDoc, 
  collectionData, doc, updateDoc, deleteDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csgo-superstars';
  usersData!: Observable<any>;

  constructor(private firestore: Firestore) {
  }
}
