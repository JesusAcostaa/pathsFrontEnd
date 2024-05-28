import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoryGamesComponent } from './auditory-games.component';

describe('AuditoryGamesComponent', () => {
  let component: AuditoryGamesComponent;
  let fixture: ComponentFixture<AuditoryGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoryGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuditoryGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
