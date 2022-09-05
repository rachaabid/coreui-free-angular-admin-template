import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookFilterPipe } from './pipes/book-filter.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';


@NgModule({
  declarations: [
    BooksComponent,
    BookFilterPipe
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class BooksModule { }
