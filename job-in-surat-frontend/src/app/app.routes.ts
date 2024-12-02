import { Routes } from '@angular/router';
import { LoginComponent } from './router-components/login/login.component';
import { HomeComponent } from './router-components/home/home.component';
import { JobDetailsComponent } from './router-components/job-details/job-details.component';
import { JobSearchComponent } from './router-components/job-search/job-search.component';
import { CreateJobComponent } from './router-components/create-job/create-job.component';
import { CareerGuideComponent } from './router-components/career-guide/career-guide.component';
import { ProfessionalJourneyComponent } from './router-components/professional-journey/professional-journey.component';
import { HighestPayingComponent } from './router-components/highest-paying/highest-paying.component';
import { BusinessSuratComponent } from './router-components/business-surat/business-surat.component';
import { SuratWeatherComponent } from './router-components/surat-weather/surat-weather.component';
import { PlacesSuratComponent } from './router-components/places-surat/places-surat.component';
import { FoodSuratComponent } from './router-components/food-surat/food-surat.component';
import { SmcComponent } from './router-components/smc/smc.component';
import { PincodeOfSuratComponent } from './router-components/pincode-of-surat/pincode-of-surat.component';
import { SuratMapComponent } from './router-components/surat-map/surat-map.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'job-search-in-surat', component: JobSearchComponent },
    { path: 'job-search-details-surat', component: JobDetailsComponent },
    { path: 'create-job', component: CreateJobComponent, canActivate: [authGuard]  },
    { path: 'career-advice', component: CareerGuideComponent },
    
    // Career Guide
    
    { path: 'starting-your-professional-journey', component: ProfessionalJourneyComponent },
    { path: 'highest-paying-jobs-in-india', component: HighestPayingComponent },
    { path: 'top-business-in-surat', component:  BusinessSuratComponent},
    
    // Blogs For Surat
    
    { path: 'surat-in-weather', component:  SuratWeatherComponent},
    { path: 'places-to-visit-in-surat', component:  PlacesSuratComponent},
    { path: 'famous-food-in-surat', component:  FoodSuratComponent},
    { path: 'surat-municipal-corporation', component:  SmcComponent},
    { path: 'pincode-of-surat', component:  PincodeOfSuratComponent},
    { path: 'surat-map', component:  SuratMapComponent},
    { path: '**', redirectTo: '' }
];
