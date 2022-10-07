import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerForm?: FormGroup;
  listCustomers?: any;
  submitted = false;
  id: any;
  searchCustomer: string = '';
  constructor(private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.customerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      type: new FormControl(''),
      countDownload: new FormControl('')
    })
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((data: any) => this.listCustomers = data);
  }


  addCustomer() {
    this.submitted = true;
    if (this.customerForm?.invalid) {
      return
    }
    this.customerService.createCustomer(this.customerForm?.value).subscribe((data: any) => {
      this.toastr.success('customer created', 'Good')
      location.reload()
    }, (error: any) => {
      console.log(error)
    }
    )

  }

  showCustomerData(id: any) {
    this.id = id;
    this.customerService.getCustomerById(id).subscribe((data: any) => {
      this.customerForm?.patchValue(data);
      this.toastr.info('here is your data', 'To modify')
    })
  }

  saveChanges() {
    this.submitted = true;
    if (this.customerForm?.invalid) {
      return
    }

    this.customerService.saveUpdate(this.id, this.customerForm?.value).subscribe((data: any) => location.reload(),
      (error: any) => {
        console.log(error)
      })
  }

  deleteCustomer(i: any) {
    this.customerService.removeCustomer(i).subscribe((data: any) => {
      this.ngOnInit();
      this.toastr.info('data deleted', 'customer')
    },
    )
  }
}


