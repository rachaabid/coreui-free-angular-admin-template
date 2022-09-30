import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookClientService } from 'src/app/client/list-books/bookClient.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
listBooks: any;
  constructor(private toastr: ToastrService, private bookClientService: BookClientService) { }

  ngOnInit(): void {
    this.bookClientService.getBooks().subscribe((response: any)=>{
      this.listBooks = response
    },
    (error)=>{console.log(error)})
  }

}

