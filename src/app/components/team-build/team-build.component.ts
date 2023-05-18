import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { TeamBuild } from '../models/interfaces';

@Component({
  selector: 'app-team-build',
  templateUrl: './team-build.component.html',
  styleUrls: ['./team-build.component.css']
})

export class TeamBuildComponent {

  teamBuildsData!: Observable<any>;
  teamBuildsList : TeamBuild[] = [];
  teamBuildObject: TeamBuild = {
    id: '',
    number_of_mates : 0,
    description : '',
    level : '',
    number_of_hours : 0,
    contact: '',
  };
  displayedColumns: string[] = ['number_of_mates', 'description', 'level', 'number_of_hours', 'contact', 'edit', 'remove'];

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

  getAllTeamBuilds() {
    this.teamBuildsData =this.data.getTeamBuilds();
  }

  addTeamBuild() {
    this.teamBuildObject.number_of_mates = Number(this.teamBuildForm.value.number_of_mates!);
    this.teamBuildObject.description = this.teamBuildForm.value.description!; 
    this.teamBuildObject.level = this.teamBuildForm.value.level!;
    this.teamBuildObject.number_of_hours = Number(this.teamBuildForm.value.number_of_hours!); 
    this.teamBuildObject.contact = this.teamBuildForm.value.contact!;

    this.data.addTeamBuild(this.teamBuildObject);

    this.teamBuildForm.reset();
  }

  updateTeamBuild() {
    // to make
  }

  deleteTeamBuild(id: string) {
    if (window.confirm('Are you sure to delete this team build search ?'))
    this.data.deleteTeamBuild(id)
  }
}
