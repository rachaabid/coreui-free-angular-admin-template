import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  listCategories?: any;
  categoryForm?: FormGroup;
  submitted = false;
  id: any;
  searchCategory: string = '';
  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.categoryForm = new FormGroup({
      nameCategory: new FormControl('', Validators.required),
    })
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => this.listCategories = data);
  }

  addCategory() {
    this.submitted = true;
    if (this.categoryForm?.invalid) {
      return
    }
    this.categoryService.createCategory(this.categoryForm?.value).subscribe(data=>{
      this.toastr.success('Category created', 'Good')
      location.reload()
    }, (error)=>{
      console.log(error)
    }
      )

  }

  showCategoryData(id: any){
    this.id=id;
    this.categoryService.getCategoryById(id).subscribe(data=>{this.categoryForm?.patchValue(data);
    this.toastr.info('Here is your data', 'To modify')
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

   deleteCategory(i: any){
    this.categoryService.removeCategory(i).subscribe(data=>{this.ngOnInit();
    this.toastr.info('Data deleted', 'Category')}, 
    )
  }

}


