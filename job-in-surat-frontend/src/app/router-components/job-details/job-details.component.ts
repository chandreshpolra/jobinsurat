import { Component } from '@angular/core';
import { ClientService } from '../../client.service';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatTextPipe } from '../../pipes/format-text.pipe';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [sharedFormsConfig, FormatTextPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {

  public jobDetails = null;

  public jobApplyObj = {
    fullName: '',
    mobileNo: '',
    email: '',
  };

  public isLoader = false;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    let jid = this.route.snapshot.queryParamMap.get('id');
    if (jid) {
      this.getJobBasedOnUserSelect(jid);
    }
  }

  getJobBasedOnUserSelect(id) {
    let payload = {
      id: id
    }
    this.clientService.getJobDetailsPortal(payload).subscribe(
      {
        next: (res) => {
          this.jobDetails = res['data'];
          this.jobDetails.faqsAboutJob = JSON.parse(this.jobDetails.faqsAboutJob);
          this.jobDetails.asset = JSON.parse(this.jobDetails.asset);
          this.jobDetails.jobBenefits = JSON.parse(this.jobDetails.jobBenefits);
        },
        error: (error) => {
          this.toastr.error('Something Went Wrong');
        }
      }
    )
  }

  applyForJob() {
    this.isLoader = true;
    if (this.jobApplyObj.mobileNo == '' && this.jobApplyObj.email == '') {
      this.isLoader = false;
      this.toastr.info('Mobile No Or Email Required');
    } else {
      this.jobApplyObj['jobTitle'] = this.jobDetails.title;
      this.jobApplyObj['clientEmail'] = this.jobDetails.companyId.companyEmail;
      this.clientService.sendJobInfoPortal(this.jobApplyObj).subscribe(
        {
          next: (res) => {
            this.isLoader = false;
            this.toastr.success('Email sent successfully');
            setTimeout(() => {
              this.reloadPage();
            }, 700);
          },
          error: (error) => {
            this.isLoader = false;
            this.toastr.error('Something Went Wrong');
          }
        }
      )
    }
  }


  reloadPage() {
    window.location.reload();
  }

}
