import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  selectedContact: Contact;
  newContact: Contact = {
    name: null,
    phone: null
  };

  constructor(private dbService: ContactService) {
  }

  ngOnInit() {
    this.getContacts();
    
  }


  getContacts() {
    this.dbService.getContacts().subscribe((c) => {
      this.contacts = c;
      console.log(this.contacts);
    });
  }

  addContact() {
    console.log("Add Contact");
    this.dbService.saveContacts(this.newContact).subscribe( (c)  => {
      console.log("Already inserted new contact")
      this.newContact = {name: null, phone: null};
      this.getContacts();
    });
    
  }

}
