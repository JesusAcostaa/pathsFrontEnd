import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedGamesComponent } from './mixed-games.component';

describe('MixedGamesComponent', () => {
  let component: MixedGamesComponent;
  let fixture: ComponentFixture<MixedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
