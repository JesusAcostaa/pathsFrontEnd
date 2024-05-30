import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningStyleSurveyComponent } from './learning-style-survey.component';

describe('LearningStyleSurveyComponent', () => {
  let component: LearningStyleSurveyComponent;
  let fixture: ComponentFixture<LearningStyleSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningStyleSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningStyleSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
