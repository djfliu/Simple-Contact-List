import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
	createDb(){
		const contacts = [
			{id: 11, name: 'Diane'},
			{id: 12, name: 'Angus'},
			{id: 13, name: 'Chamuth'},
			{id: 14, name: 'Monique'},
			{id: 15, name: 'Dad'},
			{id: 16, name: 'Mom'},
			{id: 17, name: 'Hayden'},
			{id: 18, name: 'Michael'},
			{id: 19, name: 'Nicole'},
			{id: 20, name: 'Charlene'},
		];
		return {contacts};
	};
  constructor() { }

}
