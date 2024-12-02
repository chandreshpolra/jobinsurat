import { Component } from '@angular/core';
import { ClientService } from '../../client.service';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [...sharedFormsConfig],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css'
})
export class JobSearchComponent {

  public jobList = [];
  public jobCategories = [];
  public salaryRanges = [];
  public jobGenders = [];
  public jobQualifications = [];
  public JobExperience = [];

  public jobFilter = {
    type: [],
    experience: '',
    gender: '',
    qualification: '',
    salary: null,
    jobCategory: []
  };

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getJobFilters();
    let query = this.route.snapshot.queryParamMap.get('query');
    if (query) {
      this.getJobsByfiltered(query);
    } else {
      this.getJobBasedOnUserSelect();
    }
  }

  getJobBasedOnUserSelect() {
    this.clientService.getJobListPortal().subscribe({
      next: (res) => {
        this.jobList = res['data'];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  redirectJobDetails(jobObj) {
    this.router.navigate(['/job-search-details-surat'], {
      queryParams: { id: jobObj._id }
    });
  }

  getJobFilters() {
    this.clientService.getJobFilterPortal().subscribe({
      next: (res) => {
        this.jobCategories = res['data']['jobCategory'];
        this.salaryRanges = res['data']['salaryRanges'];
        this.jobGenders = res['data']['genders'];
        this.jobQualifications = res['data']['qualifications'];
        this.JobExperience = res['data']['experienceLevels'];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  selectType(event: Event, clickSection) {
    const target = event.target as HTMLElement;
    if (clickSection === 'type') {
      this.jobFilter.type = this.toggleValue(target.innerText, this.jobFilter.type);
    } else if (clickSection === 'roles') {
      this.jobFilter.jobCategory = this.toggleValue(target.innerText, this.jobFilter.jobCategory);
    }
    target.classList.toggle('active');
    this.getJobsByfiltered();
  }

  toggleValue(value, array) {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    return array;
  }

  getJobsByfiltered(query?) {
    this.jobList = [];
    if (query === '0') {
      this.jobFilter.experience = '0'; 
      query = '';
    }
    const convertExp = this.jobFilter.experience;
    let payload = {
      'category': this.jobFilter.jobCategory,
      'type': this.jobFilter.type,
      'salary': this.jobFilter.salary,
      'experience': parseFloat(convertExp),
      'genders': this.jobFilter.gender,
      'qualification': this.jobFilter.qualification,
      'query': query
    }
    this.clientService.getJobsByFilteredPortal(payload).subscribe({
      next: (res) => {
        this.jobList = res['data'];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  clearAllFilter() {
    document.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });
    this.jobFilter = {
      type: [],
      experience: '',
      gender: '',
      qualification: '',
      salary: null,
      jobCategory: []
    }
    this.getJobBasedOnUserSelect();
  }

  applyFilter() {
    let body = document.querySelector('body');
    body.classList.toggle('filter-data');
  }

}
