import { Component, ErrorHandler } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { catchError, retry, throwError } from 'rxjs';

// Fonction de validation pour confirmer le mot de passe
export function confirmPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return {passwordsDontSame: true};
    }

    return null;
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: confirmPassword() });

  constructor(
      private authService: AuthentificationService, 
      private router: Router,
    ) {}

  ngOnInit(): void {}

  // Méthodes pour récupérer les champs du formulaire
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('password');
  }

  // Soumet le formulaire d'inscription
  submit() {
    // Vérifie si le formulaire est valide
    if (!this.registerForm.valid) {
      return;
    }
    
    // Récupère les valeurs des champs du formulaire
    let name:string = this.registerForm.value.name!;
    let email:string = this.registerForm.value.email!; 
    let password:string = this.registerForm.value.password!;

    // Appelle notre service d'authentification pour effectuer l'inscription
    this.authService.register(name, email, password)
    .pipe(
     retry(1), // Tente une nouvelle tentative en cas d'échec
     catchError(this.handleError)
    )
    .subscribe(() => {
      // Redirige vers la page d'accueil après une inscription réussie
      this.router.navigate(['/home']);
    });
  }

  // Gère les erreurs lors de l'inscription
  handleError(error:any) {
    if (error.error instanceof ErrorEvent) {
      alert(`Error: ${error.error.message}`);
    } else {
      alert(`Error: ${error.message}`);
    }
    return throwError(() => {
        return 'error';
    });
  }
}
