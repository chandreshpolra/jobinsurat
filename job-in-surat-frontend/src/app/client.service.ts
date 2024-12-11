import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = 'https://api.jobsinsurat.in';


  constructor(private httpClient: HttpClient) { }

  createJob(createJob, fileUpload) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return this.httpClient.post(`${this.url}/api/jobs/create-job`, createJob,  { headers, responseType: 'text' });
  }


  createCompany(createJob, fileUpload) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    const formData = new FormData();

    for (const key in createJob) {
      if (createJob.hasOwnProperty(key)) {
        formData.append(key, createJob[key]);
      }
    }

    if (fileUpload) {
      formData.append('file', fileUpload);
    }

    return this.httpClient.post(`${this.url}/api/company/create-company`, formData, {
      headers,
      responseType: 'text',
    });
  }


  loginPortal(userPass) {
    return this.httpClient.post(`${this.url}/api/auth/login`, userPass, { responseType: 'json' });
  }

  ragistarPortal(userPass) {
    return this.httpClient.post(`${this.url}/api/auth/register`, userPass, { responseType: 'text' });
  }

  getJobFilterPortal() {
    return this.httpClient.get(`${this.url}/api/jobs/filters`);
  }

  getCompanyInfoPortal() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return this.httpClient.get(`${this.url}/api/company/company-info`, { headers });
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


  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }


  saveToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

}
