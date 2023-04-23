import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthentificationService) {}

  ngOnInit() : void {
  }
}
