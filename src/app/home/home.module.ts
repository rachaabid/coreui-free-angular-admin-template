import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ListBooksComponent } from './list-books/list-books.component';


@NgModule({
  declarations: [
    NavbarComponent,
    BookDetailsComponent,
    ListBooksComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
