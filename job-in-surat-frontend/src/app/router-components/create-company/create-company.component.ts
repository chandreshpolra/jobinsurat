import { Component } from '@angular/core';
import { sharedFormsConfig } from '../../shared-components/shared-forms';
import { ClientService } from '../../client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [...sharedFormsConfig],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {


  public companyObj = {
    companyName: '',
    companyAbout: '',
    companyFounded: '',
    companyEmployeeCount: '',
    companyHeadquarters: '',
    companyType: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companyLogo: '',
    companyWebsite: ''
  };

  public selectedFile = '';
  public isLoader = false;

  constructor(private clientService: ClientService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  createCompanyForPost(form: any) {
    this.isLoader = true;
    if (form.valid) {
      const payload = JSON.parse(JSON.stringify(this.companyObj));
      this.clientService.createCompany(payload, this.selectedFile).subscribe(
        {
          next: (res) => {
            form.reset();
            this.resetForm();
            this.toastr.success('Company Created Successfully');
          },
          error: (error) => {
            this.toastr.error('Something Went Wrong');
          },
          complete: () => {
            this.isLoader = false;
          }
        }
      )
    }
  }

  resetForm() {
    this.companyObj = {
      companyName: '',
      companyAbout: '',
      companyFounded: '',
      companyEmployeeCount: '',
      companyHeadquarters: '',
      companyType: '',
      companyEmail: '',
      companyPhone: '',
      companyAddress: '',
      companyLogo: '',
      companyWebsite: ''
    };
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

}
