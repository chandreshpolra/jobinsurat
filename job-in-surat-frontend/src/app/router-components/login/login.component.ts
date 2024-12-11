import { Component } from '@angular/core';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ClientService } from '../../client.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...sharedFormsConfig, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public user = {
    username: '',
    password: ''
  };

  
  constructor(private clientService: ClientService, private router: Router, private toastr: ToastrService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.clientService.loginPortal(this.user).subscribe({
        next: (res: any) => {
          this.clientService.saveToken(res['data']['accessToken']); 
          this.router.navigate(['/create-job']);
        },
        error: (error) => {
          const errorResponse = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
          if (errorResponse.statusCode === 401) {
            this.toastr.info(errorResponse.message);
          } else {
            this.toastr.error('Something Went Wrong');
          }
        }
      })
    }
  }

}
