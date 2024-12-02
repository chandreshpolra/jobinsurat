import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestPayingComponent } from './highest-paying.component';

describe('HighestPayingComponent', () => {
  let component: HighestPayingComponent;
  let fixture: ComponentFixture<HighestPayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighestPayingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighestPayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
