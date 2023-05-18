import { Injectable } from '@angular/core';
import { 
  Firestore, collection, addDoc, 
  collectionData, doc, updateDoc, deleteDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TeamBuild } from '../components/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  addTeamBuild(newTeamBuild: TeamBuild) {
    const collectionInstance = collection(this.firestore, 'teamBuilds');
    addDoc(collectionInstance, newTeamBuild)
    .then(() => {;
      console.log('Team build Save Success')
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  getTeamBuilds() {
    const collectionInstance = collection(this.firestore, 'teamBuilds');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(value => {
      console.log(value);
    })

    return collectionData(collectionInstance, { idField: 'id' });
  }

  updateTeamBuild(teamBuild: TeamBuild) {
    this.deleteTeamBuild(teamBuild.id);
    this.addTeamBuild(teamBuild);
  }

  deleteTeamBuild(id: string) {
    const docInstance = doc(this.firestore, 'teamBuilds', id);

    console.log(docInstance)

    deleteDoc(docInstance)
    .then(() => {
      console.log('Team search deleted')
    })
  }
}
