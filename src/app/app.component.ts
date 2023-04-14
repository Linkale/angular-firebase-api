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
  title = 'angular-firebase-api';
  usersData!: Observable<any>;

  constructor(private firestore: Firestore) {
    this.getUsers();
  }

  getUsers() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(value => {
      console.log(value);
    })

    this.usersData = collectionData(collectionInstance, { idField: 'id' });
  }

  addUser(newUser: any) {
    console.log(newUser.value);
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, newUser.value)
    .then(() => {;
      console.log('User Save Success')
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  updateUser(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    const updateUser = {
      pseudo: 'updatedpseudo'
    }

    updateDoc(docInstance, updateUser)
    .then(() => {
      console.log('User Updated')
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deleteUser(id: string) {
    const docInstance = doc(this.firestore, 'users', id);

    deleteDoc(docInstance)
    .then(() => {
      console.log('User deleted')
    })
  }
}
