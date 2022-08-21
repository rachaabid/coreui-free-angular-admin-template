import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCustomer'
})
export class FilterCustomerPipe implements PipeTransform {

  transform(listCustomers: any[], searchCustomer: string): any[] {
    if(!listCustomers || !searchCustomer){
      return listCustomers;
    }
    return listCustomers.filter(customer=>customer.fullName?.toLowerCase().includes(searchCustomer.toLowerCase()));
  }

}
