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

  // Fonction de connexion (login) qui utilise l'e-mail et le mot de passe pour s'authentifier
  login(email: string, password: string) {
    // Utilise la fonction signInWithEmailAndPassword() de l'objet auth pour effectuer la connexion
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Fonction d'inscription (register) qui prend le nom, l'e-mail et le mot de passe en tant que paramètres
  register(name: string, email: string, password: string) {
    // Utilise la fonction createUserWithEmailAndPassword() de l'objet auth pour créer un nouvel utilisateur avec l'e-mail et le mot de passe fournis
    // Ensuite, utilise l'opérateur switchMap() pour passer à l'étape suivante et mettre à jour le profil de l'utilisateur avec le nom fourni dans le module auth
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(switchMap(({user}) => updateProfile(user, {displayName: name}))
    );
  }

  // Fonction de déconnexion (logout)
  logout() {
    return from(this.auth.signOut());
  }
}
