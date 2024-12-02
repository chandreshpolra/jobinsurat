import { Component } from '@angular/core';
import { ClientService } from '../../client.service';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [...sharedFormsConfig],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {

  public job = {
    title: '',
    category: '',
    salary: 0,
    companyId: '',
    experience: {
      min: '',
      max: ''
    },
    vacancies: '',
    type: '',
    skills: '',
    qualification: '',
    industry: '',
    genders: '',
    jobTime: '',
    jobDescription: [''],
    otherDetails: '',
    contactPerson: '',
    interviewAddress: '',
    jobBenefits: {
      pf: false,
      medical: false,
      meal: false
    },
    asset: {
      bike: false,
      smartphone: false,
      pancard: false,
      aadhar_card: false,
      two_wheeler_licence: false,
      bank_account: false,
    },
    faqsAboutJob: [
      { question: '', answer: '' }
    ],
  };
  public jobCategories = [];
  public jobExperience = [];
  public jobGenders = [];
  public jobQualifications = [];
  public companyInfoList = [];
  public selectedFile = '';

  constructor(private clientService: ClientService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getJobFilters();
    this.getCompanyInfo();
  }

  getJobFilters() {
    this.clientService.getJobFilterPortal().subscribe(
      {
        next: (res) => {
          this.jobCategories = res['data']['jobCategory'];
          this.jobExperience = res['data']['experienceLevels'];
          this.jobGenders = res['data']['genders'];
          this.jobQualifications = res['data']['qualifications'];
        },
        error: (error) => {
          this.toastr.error('Something Went Wrong');
        }
      }
    )
  }

  getCompanyInfo() {
    this.clientService.getCompanyInfoPortal().subscribe(
      {
        next: (res) => {
          this.companyInfoList = res['data'];
        },
        error: (error) => {
          this.toastr.error('Something Went Wrong');
        }
      }
    )
  }

  createJobPost(form: any) {
    if (form.valid) {
      const payload = JSON.parse(JSON.stringify(this.job));
      payload.experience.min = parseFloat(payload.experience.min);
      payload.experience.max = parseFloat(payload.experience.max);
      payload.jobBenefits = JSON.stringify(payload.jobBenefits);
      payload.experience = JSON.stringify(payload.experience);
      payload.asset = JSON.stringify(payload.asset);
      payload.faqsAboutJob = JSON.stringify(payload.faqsAboutJob);
      this.clientService.createJob(payload, this.selectedFile).subscribe(
        {
          next: (res) => {
            form.reset();
            this.resetForm();
            this.toastr.success('Job Created Successfully');
          },
          error: (error) => {
            this.toastr.error('Something Went Wrong');
          }
        }
      )
    }
  }

  addJobDescription() {
    this.job.jobDescription.push('');
  }

  removeJobDescription(index: number) {
    this.job.jobDescription.splice(index, 1);
  }

  addFaq() {
    this.job.faqsAboutJob.push({ question: '', answer: '' });
  }

  removeFaq(index: number) {
    if (this.job.faqsAboutJob.length > 1) {
      this.job.faqsAboutJob.splice(index, 1);
    }
  }

  dateChangeCheck() {
    if (this.job.experience.min > this.job.experience.max) {
      this.job.experience.max = null;
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  resetForm() {
    this.job = {
      title: '',
      category: '',
      salary: 0,
      companyId: '',
      experience: {
        min: '',
        max: ''
      },
      vacancies: '',
      type: '',
      skills: '',
      qualification: '',
      industry: '',
      genders: '',
      jobTime: '',
      jobDescription: [''],
      otherDetails: '',
      contactPerson: '',
      interviewAddress: '',
      jobBenefits: {
        pf: false,
        medical: false,
        meal: false
      },
      asset: {
        bike: false,
        smartphone: false,
        pancard: false,
        aadhar_card: false,
        two_wheeler_licence: false,
        bank_account: false,
      },
      faqsAboutJob: [
        { question: '', answer: '' }
      ],
    };
  }

}
