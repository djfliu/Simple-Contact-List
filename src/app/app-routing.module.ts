import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Routes =[

	{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: ContactDetailComponent }	
];

@NgModule({
	exports:[ RouterModule ],
	imports:[ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { 

}
