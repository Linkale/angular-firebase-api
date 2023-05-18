import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {MaterialExampleModule} from '../../materiale.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { TableComponent } from './components/table/table.component';
import { MatchComponent } from './components/match/match.component';
import { TeamBuildComponent } from './components/team-build/team-build.component';
 
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TableComponent,
    MatchComponent,
    TeamBuildComponent,
  ],
  imports: [
    AppRoutingModule, NgxPaginationModule, 
    FormsModule, ReactiveFormsModule, HttpClientModule,
    BrowserModule,  BrowserAnimationsModule, 
    MatToolbarModule, MatIconModule, MatNativeDateModule, MaterialExampleModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
