import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerGuideComponent } from './career-guide.component';

describe('CareerGuideComponent', () => {
  let component: CareerGuideComponent;
  let fixture: ComponentFixture<CareerGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerGuideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareerGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
