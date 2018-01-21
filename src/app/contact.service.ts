import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ContactService {
	private contactsUrl = 'api/contacts'; // URL to web api
	
  constructor(private http: HttpClient, 
              private messageService: MessageService) { }

	getContacts(): Observable<Contact[]>{
		return this.http.get<Contact[]>(this.contactsUrl)
		.pipe(
			tap(contacts => this.log('fetched contacts')),
			catchError(this.handleError('getContacts', []))
			);
	} 

  getHeroNo404<Data>(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/?id=${id}`;
    return this.http.get<Contact[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Contact>(`getHero id=${id}`))
      );
  }

	getContact(id: number): Observable<Contact>{
  	const url = `${this.contactsUrl}/${id}`;
  	return this.http.get<Contact>(url)
  	.pipe(
  		tap(_ => this.log(`fetched hero id=${id}`)),
  		catchError(this.handleError<Contact>(`getContact id=${id}`))
  		);
  	}

  	updateContact(contact: Contact): Observable<any>{
  		return this.http.put(this.contactsUrl, contact, httpOptions).pipe(
  			tap(_ => this.log(`updated contact id=${contact.id}`)),
  			catchError(this.handleError<any>('updateContact'))
  			);
  	}

  	addContact(contact: Contact): Observable<Contact>{
  		return this.http.post<Contact>(this.contactsUrl, contact, httpOptions).pipe(
  			tap((contact: Contact) => this.log(`added contact w/ id=${contact.id}`)),
  			catchError(this.handleError<Contact>('addContact'))
  			);

  	}

  	deleteContact(contact: Contact | number): Observable<Contact>{
  		const id = typeof contact === 'number' ? contact : contact.id;
  		const url = `${this.contactsUrl}/${id}`;

  		return this.http.delete<Contact>(url, httpOptions).pipe(
  			tap(_ => this.log(`deleted contact id=${id}`)),
  			catchError(this.handleError<Contact>('deleteContact'))
  			);
  	}

    searchContacts(term: string): Observable<Contact[]>{
      if (!term.trim()){
        return of([]);
      }
      return this.http.get<Contact[]>(`api/contacts/?name=${term}`).pipe(
        tap(_ => this.log(`found contacts matching "${term}"`)),
        catchError(this.handleError<Contact[]>('searchContacts', []))
        );
    }
  	

  	private log(message: String){
  	this.messageService.add('ContactService: ' + message);
  }

 
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
	private handleError<T> (operation = 'operation', result?: T) {
  		return (error: any): Observable<T> => {

    	// TODO: send the error to remote logging infrastructure
    	console.error(error); // log to console instead

    	// TODO: better job of transforming error for user consumption
    	this.log(`${operation} failed: ${error.message}`);

    	// Let the app keep running by returning an empty result.
    	return of(result as T);
  		};
	}
}
