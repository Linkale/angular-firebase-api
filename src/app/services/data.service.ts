import { Injectable } from '@angular/core';
import { 
  Firestore, collection, addDoc, 
  collectionData, doc, updateDoc, deleteDoc 
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
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
  }

  getTeamBuilds() {
    const collectionInstance = collection(this.firestore, 'teamBuilds');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(value => {
    })
    return collectionData(collectionInstance, { idField: 'id' });
  }

  getTeamBuild(id: string) {
    const docInstance = doc(this.firestore, 'teamBuilds', id);
    return getDoc(docInstance).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        throw new Error("no teamBuild find");
      }
    })
  }

  updateTeamBuild(id : string, updateTeamBuild : TeamBuild) {
    const docInstance = doc(this.firestore, 'teamBuilds', id);
    updateDoc(docInstance, {
      number_of_mates: updateTeamBuild.number_of_mates,
      description: updateTeamBuild.description,
      level: updateTeamBuild.level,
      number_of_hours: updateTeamBuild.number_of_hours,
      contact: updateTeamBuild.contact,
    })
  }

  deleteTeamBuild(id: string) {
    const docInstance = doc(this.firestore, 'teamBuilds', id);

    deleteDoc(docInstance)
  }
}
