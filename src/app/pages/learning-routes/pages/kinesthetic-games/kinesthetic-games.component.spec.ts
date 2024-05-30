import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinestheticGamesComponent } from './kinesthetic-games.component';

describe('KinestheticGamesComponent', () => {
  let component: KinestheticGamesComponent;
  let fixture: ComponentFixture<KinestheticGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KinestheticGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KinestheticGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
