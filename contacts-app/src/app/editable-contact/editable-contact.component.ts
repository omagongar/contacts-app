import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contacts';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-editable-contact',
  templateUrl: './editable-contact.component.html',
  styleUrls: ['./editable-contact.component.css']
})
export class EditableContactComponent implements OnInit {

  @Input() contact: Contact;
  editable: boolean;
  constructor(private dbService: ContactService) { 
    this.editable = false;
  }

  ngOnInit() {
  }

  onEdit() {
    this.editable = !this.editable;
    console.log(this.editable);
    if(!this.editable){
      this.dbService.updateContacts(this.contact).subscribe((c) => {
        console.log(c);
        //this.contact = ;
      });  
    }
  }

  onDelete(){
    this.dbService.deleteContact(this.contact).subscribe((c) => {
      console.log(c);
      
    });
  }

}
