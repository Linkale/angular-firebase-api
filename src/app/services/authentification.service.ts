import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(switchMap(({user}) => updateProfile(user, {displayName: name}))
    );
  }

  logout() {
    return from(this.auth.signOut());
  }
}
