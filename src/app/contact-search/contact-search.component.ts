import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
	debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  private searchTerms = new Subject<string>();

  constructor(private contactService: ContactService) 
  { }

  search(term: string): void {
  	this.searchTerms.next(term);
  }


  ngOnInit(): void {
  	this.contacts$ = this.searchTerms.pipe(
  		debounceTime(300),
  		distinctUntilChanged(),
  		switchMap((term: string) => this.contactService.searchContacts(term))
  		);
  }

}
