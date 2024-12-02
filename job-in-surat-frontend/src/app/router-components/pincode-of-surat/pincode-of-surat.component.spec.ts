import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeOfSuratComponent } from './pincode-of-surat.component';

describe('PincodeOfSuratComponent', () => {
  let component: PincodeOfSuratComponent;
  let fixture: ComponentFixture<PincodeOfSuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PincodeOfSuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PincodeOfSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
