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

  // Fonction pour ajouter un nouveau "teamBuild" à la collection "teamBuilds"
  addTeamBuild(newTeamBuild: TeamBuild) {
    // Obtient une référence à la collection "teamBuilds"
    const collectionInstance = collection(this.firestore, 'teamBuilds');
    // Ajoute un nouveau document avec les données de "newTeamBuild" à la collection
    addDoc(collectionInstance, newTeamBuild)
  }

  // Fonction pour récupérer tous les "teamBuilds" de la collection "teamBuilds"
  getTeamBuilds() {
    const collectionInstance = collection(this.firestore, 'teamBuilds');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(value => {
    })
    // Récupère les données de la collection en lui spécifiant que l'on veut les identifiants ("idField")
    return collectionData(collectionInstance, { idField: 'id' });
  }

  // Fonction pour récupérer un "teamBuild" spécifique par son Id
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

  // Fonction pour mettre à jour un "teamBuild" spécifique par son Id
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

  // Fonction pour supprimer un "teamBuild" spécifique par son Id
  deleteTeamBuild(id: string) {
    const docInstance = doc(this.firestore, 'teamBuilds', id);

    deleteDoc(docInstance)
  }
}
