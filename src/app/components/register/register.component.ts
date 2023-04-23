import { Component, ErrorHandler } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { catchError, retry, throwError } from 'rxjs';

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

  submit() {
    if (!this.registerForm.valid) {
      return;
    }
    
    let name:string = this.registerForm.value.name!;
    let email:string = this.registerForm.value.email!; 
    let password:string = this.registerForm.value.password!;
    this.authService.register(name, email, password)
    .pipe(retry(1), catchError(this.handleError))
    .subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  handleError(error:any) {
    if (error.error instanceof ErrorEvent) {
      // client-side error
      alert(`Error: ${error.error.message}`);
    } else {
      // server-side error
      alert(`Error: ${error.message}`);
    }
    return throwError(() => {
        return 'error';
    });
  }
}
