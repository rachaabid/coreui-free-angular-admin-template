import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/views/books/services/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
listBooks: any;
  constructor(private toastr: ToastrService, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((response: any)=>{
      this.listBooks = response
    },
    (error)=>{console.log(error)})
  }

}

