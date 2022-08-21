import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(listBooks: any[], searchBook: string): any[] {
    if(!listBooks || !searchBook){
      return listBooks;
    }
    return listBooks.filter(book=>book.title?.toLowerCase().includes(searchBook.toLowerCase()));
  }

}
