import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../client.service';
import { ToastrService } from 'ngx-toastr';
import { sharedFormsConfig } from '../../shared-components/shared-forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, sharedFormsConfig],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private clientService: ClientService, private toastr: ToastrService) { }


  public jobPostObj = {
    fullName: '',
    mobileNo: '',
    email: '',
  };

  public isLoader = false;

  openMobileMenu() {
    let body = document.querySelector('body');
    body.classList.toggle('open-menu');
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/job-search-in-surat']);
    });
  }

  contactForJobPost() {
    this.isLoader = true;
    if (this.jobPostObj.mobileNo == '' && this.jobPostObj.email == '') {
      this.isLoader = false;
      this.toastr.info('Mobile No Or Email Required');
    } else {
      this.jobPostObj['jobTitle'] = 'Contacted For Job Post';
      this.jobPostObj['clientEmail'] = 'suratjobportal@gmail.com';
      this.clientService.sendJobInfoPortal(this.jobPostObj).subscribe(
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
