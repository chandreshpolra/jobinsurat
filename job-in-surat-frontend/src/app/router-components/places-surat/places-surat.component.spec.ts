import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSuratComponent } from './places-surat.component';

describe('PlacesSuratComponent', () => {
  let component: PlacesSuratComponent;
  let fixture: ComponentFixture<PlacesSuratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesSuratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacesSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
