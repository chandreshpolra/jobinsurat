import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratMapComponent } from './surat-map.component';

describe('SuratMapComponent', () => {
  let component: SuratMapComponent;
  let fixture: ComponentFixture<SuratMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuratMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuratMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
