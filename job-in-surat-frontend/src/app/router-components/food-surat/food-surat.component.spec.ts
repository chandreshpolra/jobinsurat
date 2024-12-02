import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSuratComponent } from './food-surat.component';

describe('FoodSuratComponent', () => {
  let component: FoodSuratComponent;
  let fixture: ComponentFixture<FoodSuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
