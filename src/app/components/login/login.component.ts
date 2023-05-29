import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
      private authService: AuthentificationService, 
      private router: Router,
    ) {}

  ngOnInit(): void {}

  // Méthodes pour récupérer les champs du formulaire
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Soumet le formulaire de connexion
  submit() {
    // Vérifie si le formulaire est valide
    if (!this.loginForm.valid) {
      return;
    }

    // Récupère les valeurs des champs du formulaire
    let email:string = this.loginForm.value.email!; 
    let password:string = this.loginForm.value.password!;

    // Appelle notre service d'authentification pour effectuer la connexion
    this.authService.login(email, password).subscribe(() => {
      // Redirige vers la page d'accueil après une connexion réussie
      this.router.navigate(['/home']);
    });
  }
}
