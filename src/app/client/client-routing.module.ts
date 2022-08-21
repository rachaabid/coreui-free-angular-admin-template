import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '@coreui/angular';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ClientComponent } from './client.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '', component: ClientComponent,
    children: [
      {
        path:'welcome', component: WelcomeComponent
      },
      {
        path:'books', component: ListBooksComponent
      },
      {
        path:'books/book-details/:id', component: BookDetailsComponent
      }
    ]
  },
  {
    path: 'navbar', component: NavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
