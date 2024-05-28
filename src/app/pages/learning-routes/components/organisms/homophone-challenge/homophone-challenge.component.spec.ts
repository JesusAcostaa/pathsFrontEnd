import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomophoneChallengeComponent } from './homophone-challenge.component';

describe('WordSoundMatchComponent', () => {
  let component: HomophoneChallengeComponent;
  let fixture: ComponentFixture<HomophoneChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomophoneChallengeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomophoneChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
