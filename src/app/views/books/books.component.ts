import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../books/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { IOption } from 'ng-select';
import { saveAs } from 'file-saver';

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
  listCategories: Array<IOption> = [];

  searchBook: string = '';
  fileSelected: any;
  constructor(private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categories: new FormControl(''),
      photo: new FormControl(''),
      content: new FormControl('')
    })
  }
  loadBooks() {
    this.bookService.getBooks().subscribe((data: any) => this.listBooks = data);
  }

  loadCategories() {
    this.bookService.getCategories().subscribe((data: any) => { this.listCategories = data })
  }

  selectImage(event: any) {
    this.fileSelected = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected);
    reader.onloadend = () => {
      const base64String = (<string>reader.result).replace("data:", "").replace(/^.+,/, "");
      this.bookForm?.controls['photo'].setValue("data:image/jpeg;base64," + base64String.toString())
    }
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
      formData.append('photo', this.fileSelected, this.fileSelected.name)
      this.bookService.createBook(formData).subscribe((data: any) => {
        this.toastr.success('Book created', 'Good')
        location.reload();
      },
        (error: any) => {
          console.log(error)
        })
    }
  }

  deleteBook(id: any){
    this.bookService.removeBook(id).subscribe(data=>{
      this.ngOnInit();
      this.toastr.info('Book deleted', 'Book'),
      (error: any)=>{console.log(error)};
      
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
      formData.append('photo', this.fileSelected, this.fileSelected.name)
    this.bookService.saveUpdate(this.id, formData).subscribe((data: any) => location.reload(),
      (error: any) => {
        console.log(error)
      })
  }

}

changeCategory(e: any){
  this.bookForm?.get('categories')?.setValue(e.target.value, {onlySelf: true})
  }

  download() {
		this.bookService.downloadFile().subscribe((response: any) => {
			 let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(response);
		
			saveAs(url);
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	}
}
