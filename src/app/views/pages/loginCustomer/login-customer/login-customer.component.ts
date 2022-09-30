import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginCustomerService } from '../../loginCustomer/login-customer.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent implements OnInit {
logCustomerForm?: FormGroup;
submitted = false;
  constructor(private toastr: ToastrService, private route: Router, private loginCustomerService: LoginCustomerService) { }

  ngOnInit(): void {
    this.logCustomerForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      
  })
  }

  loginCustomer(){
    this.submitted=true;
    if (this.logCustomerForm?.invalid){
      return
    }
    this.loginCustomerService.signInCustomer(this.logCustomerForm?.value).subscribe((response: any)=>{ 
      localStorage.setItem('token', response.token)
      this.toastr.success('Welcome to library', 'Hello')
      this.route.navigate(['/client/home']);
    }, (error: any)=>{
      console.log(error)
    })
  }

}
