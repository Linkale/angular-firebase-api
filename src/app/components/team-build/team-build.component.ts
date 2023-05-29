import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { TeamBuild } from '../models/interfaces';

@Component({
  selector: 'app-team-build',
  templateUrl: './team-build.component.html',
  styleUrls: ['./team-build.component.css']
})

export class TeamBuildComponent {

  teamBuildsData! : Observable<any>;
  teamBuildsList : TeamBuild[] = [];
  // Initialisation d'un objet TeamBuild vide
  teamBuildObject : TeamBuild = {
    id: '',
    number_of_mates : 0,
    description : '',
    level : '',
    number_of_hours : 0,
    contact: '',
  };
  // Colonnes affichées dans la table
  displayedColumns: string[] = ['number_of_mates', 'description', 'level', 'number_of_hours', 'contact', 'edit', 'remove'];
  editMode : boolean = false;
  currentTeamBuildId : string = '';

  teamBuildForm = new FormGroup({
    number_of_mates: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    number_of_hours: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
  })

  constructor(private data : DataService) {}

  ngOnInit(): void {
    this.getAllTeamBuilds()
  }

  // Méthodes pour récupérer les champs du formulaire
  get number_of_mates() {
    return this.teamBuildForm.get('number_of_mates');
  }

  get description() {
    return this.teamBuildForm.get('description');
  }

  get level() {
    return this.teamBuildForm.get('level');
  }

  get number_of_hours() {
    return this.teamBuildForm.get('number_of_hours');
  }

  get contact() {
    return this.teamBuildForm.get('contact');
  }

  // Récupère tous les TeamBuilds via notre service
  getAllTeamBuilds() {
    this.teamBuildsData =this.data.getTeamBuilds();
  }

  // Ajout d'un TeamBuild ou mise à jour d'un teamBuild
  addTeamBuild() {
    // Récupère les valeurs du formulaire et les assigne à l'objet de TeamBuild créé plutot
    this.teamBuildObject.number_of_mates = Number(this.teamBuildForm.value.number_of_mates!);
    this.teamBuildObject.description = this.teamBuildForm.value.description!; 
    this.teamBuildObject.level = this.teamBuildForm.value.level!;
    this.teamBuildObject.number_of_hours = Number(this.teamBuildForm.value.number_of_hours!); 
    this.teamBuildObject.contact = this.teamBuildForm.value.contact!;

    if (!this.editMode) {
      // Si nous sommes pas en mode"update", crééer un nouvel objet
      this.data.addTeamBuild(this.teamBuildObject);
    } else {
      // Si nous sommes en mode "update", met à jour un objet via son Id
      this.data.updateTeamBuild(this.currentTeamBuildId ,this.teamBuildObject);
    }
    // Reset du formulaire
    this.currentTeamBuildId = '';
    this.editMode = false;
    this.teamBuildForm.reset();
  }

  // Met à jour un TeamBuild
  updateTeamBuild(id: string) {
    // Récupère les données du TeamBuild à partir de son Id
    this.data.getTeamBuild(id).then((teamBuildData) => {
      // Rempli le formulaire avec les données du TeamBuild récupéré
      this.teamBuildForm.setValue({
        number_of_mates: teamBuildData['number_of_mates'],
        description: teamBuildData['description'],
        level: teamBuildData['level'],
        number_of_hours: teamBuildData['number_of_hours'],
        contact: teamBuildData['contact'],
      });
      // Passage en mode édition
      this.editMode = true;
      this.currentTeamBuildId = id;
    }).catch((error) => {
      throw new Error("no teamBuild find");
    });
  }

  // Supprime un TeamBuild via son Id
  deleteTeamBuild(id: string) {
    if (window.confirm('Are you sure to delete this team build search ?'))
    this.data.deleteTeamBuild(id)
  }
}
