import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../books/services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Books',
  templateUrl: './Books.component.html',
  styleUrls: ['./Books.component.scss']
})
export class BooksComponent implements OnInit {
  listBooks?: any;
  bookForm?: FormGroup;
  submitted = false;
  id: any;
  searchBook: string = '';
  fileSelected: any;
  constructor(private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('')
    })
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data: any) => this.listBooks = data);
  }

  selectFilePdf(event: any) {
    this.fileSelected = event.target.files[0];
  }

  addBook() {
    this.submitted = true;
    if (this.bookForm?.invalid) {
      return
    }
    let formData: any = new FormData();
    const bookForm = this.bookForm?.value;
    Object.keys(bookForm).forEach(fieldName => {
      formData.append(fieldName, bookForm[fieldName]);
    });
    if (this.fileSelected) {
      formData.append('content', this.fileSelected, this.fileSelected.name)
      this.bookService.createBook(formData).subscribe((data: any) => {
        location.reload();
        this.toastr.success('Book created', 'Good')
      },
        (error: any) => {
          console.log(error)
        })
    }
  }

  deleteBook(i: any){
    this.bookService.removeBook(i).subscribe(data=>{
      this.ngOnInit();
      this.toastr.info('Data deleted', 'Book')
    })
  }
   

  showBookData(id: any) {
    this.id = id;
    this.bookService.getBookById(id).subscribe((data: any) => {
      this.bookForm?.patchValue(data);
      this.toastr.info('here is your data', 'To modify')
    })
  }

  saveChanges() {
    this.submitted = true;
    if (this.bookForm?.invalid) {
      return
    }
    let formData: any = new FormData();
    const bookForm = this.bookForm?.value;
    Object.keys(bookForm).forEach(fieldName => {
      formData.append(fieldName, bookForm[fieldName]);
    });
    if (this.fileSelected) {
      formData.append('content', this.fileSelected, this.fileSelected.name)
    this.bookService.saveUpdate(this.id, formData).subscribe((data: any) => location.reload(),
      (error: any) => {
        console.log(error)
      })
  }

}
}
