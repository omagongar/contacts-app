import { Injectable } from '@angular/core';

import { Observable, of, concat } from 'rxjs';

import { Contact } from './contacts';
import { CONTACTS } from './mock-contacts';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  serverUrl = 'api/v1';
  
  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    const url = this.serverUrl + '/contacts';
    return this.httpClient.get<Contact[]>(url);
  }

  saveContacts(newContact: Contact) {
    console.log("Add contact Service");
    const url = this.serverUrl + '/contacts';
    console.log(url);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<Contact>(url, JSON.stringify(newContact), httpOptions);  
  }

  updateContacts(contact: Contact){
    console.log("Update contact Service");
    var params = new HttpParams().set('name', contact.name);
    const url = this.serverUrl + '/contacts/' + contact.name;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.put(url, JSON.stringify(contact), httpOptions);
  }

  deleteContact(contact: Contact){
    const url = this.serverUrl + '/contacts/' + contact.name;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.delete(url, httpOptions);
  }
}
