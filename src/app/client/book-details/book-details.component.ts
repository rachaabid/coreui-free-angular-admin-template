import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookClientService } from 'src/app/client/list-books/bookClient.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  idBook: any;
  countDownload: any;
  typeCustomer: any;
  constructor(private bookClientService: BookClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idBook = this.route.snapshot.params['id'];
    this.bookClientService.getBookById(this.idBook).subscribe(response => this.book = response);
    
    const token = localStorage.getItem('token') || '';
    let decodedToken: any = jwt_decode(token);
    this.countDownload = decodedToken.countDownload;
    this.typeCustomer = decodedToken.type;
  }
}
