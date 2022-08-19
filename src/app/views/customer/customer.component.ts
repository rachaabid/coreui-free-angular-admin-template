import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm?: FormGroup;
  listCustomers: any;
  submitted = false;
  id: any;
  constructor(private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.customerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      type: new FormControl(''),
    })
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => this.listCustomers = data);
  }


  addcustomer() {
    this.submitted = true;
    if (this.customerForm?.invalid) {
      return
    }
    this.customerService.createaCustomer(this.customerForm?.value).subscribe(data => {
      this.toastr.success('customer created', 'Good')
      location.reload()
    }, (error) => {
      console.log(error)
    }
    )

  }

  showCustomerData(id: any) {
    this.id = id;
    this.customerService.getCustomerById(id).subscribe(data => {
      this.customerForm?.patchValue(data);
      this.toastr.info('here is your data', 'To modify')
    })
  }

  saveChanges() {
    this.submitted = true;
    if (this.customerForm?.invalid) {
      return
    }

    this.customerService.saveUpdate(this.id, this.customerForm?.value).subscribe(data => location.reload(),
      (error) => {
        console.log(error)
      })
  }

  deleteCustomer(i: any) {
    this.customerService.removeCustomer(i).subscribe(data => {
      this.ngOnInit();
      this.toastr.info('data deleted', 'customer')
    },
    )
  }
}

