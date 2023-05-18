import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuildComponent } from './team-build.component';

describe('TeamBuildComponent', () => {
  let component: TeamBuildComponent;
  let fixture: ComponentFixture<TeamBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
