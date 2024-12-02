import { Component } from '@angular/core';
import { ClientService } from '../../client.service';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ActivatedRoute } from '@angular/router';
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
          console.error(error);
        }
      }
    )
  }

  applyForJob() {
    if (this.jobApplyObj.mobileNo == '' && this.jobApplyObj.email == '') {
      this.toastr.info('Mobile No Or Email Required');
    } else {
      this.jobApplyObj['jobTitle'] = this.jobDetails.title;
      this.jobApplyObj['clientEmail'] = this.jobDetails.companyId.companyEmail;
      this.clientService.sendJobInfoPortal(this.jobApplyObj).subscribe(
        {
          next: (res) => {
            this.toastr.success('Email sent successfully');
          },
          error: (error) => {
            this.toastr.error('Something Went Wrong');
          }
        }
      )
    }
  }


}
