import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { IOption } from 'ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listCategories: any;
  categoryForm?: FormGroup;
  submitted = false;
  id: any;
  listBooks: Array<IOption> = []
  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBooks();
    this.categoryForm = new FormGroup({
      nameCategory: new FormControl('', Validators.required),
      books: new FormControl(''),
    })
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => this.listCategories = data);
  }

  loadBooks() {
    this.categoryService.getBooks().subscribe((data: any) => { this.listBooks = data })
  }

  addcategory() {
    this.submitted = true;
    if (this.categoryForm?.invalid) {
      return
    }
    this.categoryService.createacategory(this.categoryForm?.value).subscribe(data=>{
      this.toastr.success('category created', 'Good')
      location.reload()
    }, (error)=>{
      console.log(error)
    }
      )

  }

  showcategoryData(id: any){
    this.id=id;
    this.categoryService.getCategoryById(id).subscribe(data=>{this.categoryForm?.patchValue(data);
    this.toastr.info('here is your data', 'To modify')
    })
   }
 
   saveChanges(){
     this.submitted = true;
     if(this.categoryForm?.invalid){
       return
     }
    
     this.categoryService.saveUpdate(this.id, this.categoryForm?.value).subscribe(data=>location.reload(),
     (error)=>{
      console.log(error)})
   }

   deletecategory(i: any){
    this.categoryService.removeCategory(i).subscribe(data=>{this.ngOnInit();
    this.toastr.info('data deleted', 'category')}, 
    )
  }

 changeBook(e: any){
 this.categoryForm?.get('books')?.setValue(e.target.value, {onlySelf: true})
 }

}

