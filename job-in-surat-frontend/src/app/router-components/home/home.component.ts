import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...sharedFormsConfig, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public jobSearch = '';
  public allCategories = [];
  public topCompanies = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.getJobsByfiltered();
    this.getTopCompanyHiring();
  }

  redirectJobDetails(clickRedirect?) {
    if (clickRedirect) {
      this.jobSearch = clickRedirect;
      this.router.navigate(['/job-search-in-surat'], {
        queryParams: { query: this.jobSearch }
      });
    } else {
      this.router.navigate(['/job-search-in-surat']);
    }
    
  }

  getJobsByfiltered() {
    this.allCategories = [];
    this.clientService.getJobsByCategoriesPortal().subscribe({
      next: (res) => {
        this.allCategories = res['data'];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getTopCompanyHiring() {
    this.clientService.getTopJobCompanyPortal().subscribe({
      next: (res) => {
        this.topCompanies = res['data'];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  
}
