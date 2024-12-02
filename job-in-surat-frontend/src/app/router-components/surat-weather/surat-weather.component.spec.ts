import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratWeatherComponent } from './surat-weather.component';

describe('SuratWeatherComponent', () => {
  let component: SuratWeatherComponent;
  let fixture: ComponentFixture<SuratWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuratWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuratWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
