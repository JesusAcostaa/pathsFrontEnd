import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualGamesComponent } from './visual-games.component';

describe('VisualGamesComponent', () => {
  let component: VisualGamesComponent;
  let fixture: ComponentFixture<VisualGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
