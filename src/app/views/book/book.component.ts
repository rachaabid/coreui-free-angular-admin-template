import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Book',
  templateUrl: './Book.component.html',
  styleUrls: ['./Book.component.css']
})
export class BookComponent implements OnInit {
  listBooks: any;
  bookForm?: FormGroup;
  submitted = false;
  id: any;

  constructor(private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.listBooks = data);
  }

  addbook(){
    this.submitted = true;
    if (this.bookForm?.invalid){
      return
    }
    this.bookService.createBook(this.bookForm?.value).subscribe(data => {location.reload();
      this.toastr.success('Book created', 'Good')},
      (error)=>{
        console.log(error)
      })
  }

  deletebook(i: any){
    this.bookService.removeBook(i).subscribe(data=>{this.ngOnInit();
      this.toastr.info('data deleted', 'book')})
  }

  showbookData(id: any){
    this.id=id;
    this.bookService.getBookById(id).subscribe(data=>{this.bookForm?.patchValue(data);
      this.toastr.info('here is your data', 'To modify')
    })
   }
 
   saveChanges(){
     this.submitted = true;
     if(this.bookForm?.invalid){
       return
     }
     this.bookService.saveUpdate(this.id, this.bookForm?.value).subscribe(data=>location.reload(), 
      (error)=>{
        console.log(error)})
   }

}
