import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from '../client/navbar/navbar.component';
import { BookDetailsComponent } from '../client/book-details/book-details.component';
import { ListBooksComponent } from '../client/list-books/list-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientComponent,
    WelcomeComponent,
    NavbarComponent,
    BookDetailsComponent,
    ListBooksComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
