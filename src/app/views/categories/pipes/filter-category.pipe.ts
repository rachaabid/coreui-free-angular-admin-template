import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(listCategories: any[], searchCategory: string): any[] {
    if(!listCategories || !searchCategory){
      return listCategories;
    }
    return listCategories.filter(category=>category.nameCategory?.toLowerCase().includes(searchCategory.toLowerCase()));
  }

}
