import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSuratComponent } from './business-surat.component';

describe('BusinessSuratComponent', () => {
  let component: BusinessSuratComponent;
  let fixture: ComponentFixture<BusinessSuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessSuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
