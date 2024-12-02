import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // This provides the service globally (root injector)
})
export class ClientService {

  private url = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}
 
  createJob(createJob, fileUpload) {
    return this.httpClient.post(`${this.url}/api/jobs/create-job`, createJob, { responseType: 'text' });
  }

  loginPortal(userPass) {
    return this.httpClient.post(`${this.url}/api/auth/login`, userPass, { responseType: 'text', withCredentials: true});
  }

  ragistarPortal(userPass) {
    return this.httpClient.post(`${this.url}/api/auth/register`, userPass, { responseType: 'text' });
  }

  getJobFilterPortal() {
    return this.httpClient.get(`${this.url}/api/jobs/filters`);
  }

  getCompanyInfoPortal() {
    return this.httpClient.get(`${this.url}/api/company/company-info`);
  }

  getJobListPortal() {
    return this.httpClient.get(`${this.url}/api/jobs`);
  }

  getJobDetailsPortal(payload) {
    return this.httpClient.post(`${this.url}/api/jobs/job-details`, payload, { responseType: 'json' });
  }

  getJobsByFilteredPortal(payload) {
    return this.httpClient.post(`${this.url}/api/jobs/job-details-filter`, payload, { responseType: 'json' });
  }

  getJobsByCategoriesPortal() {
    return this.httpClient.get(`${this.url}/api/jobs/categories`);
  }

  getTopJobCompanyPortal() {
    return this.httpClient.get(`${this.url}/api/jobs/top-job-company`);
  }

  sendJobInfoPortal(payload) {
    return this.httpClient.post(`${this.url}/api/company/apply-for-job`, payload, { responseType: 'json' });
  }

}
