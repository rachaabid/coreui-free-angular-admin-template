import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent implements OnInit {
logCustomerForm?: FormGroup;
submitted = false;
  constructor(private toastr: ToastrService, private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.logCustomerForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
  })
  }

  loginCustomer(){
    this.submitted=true;
    if (this.logCustomerForm?.invalid){
      return
    }
    this.loginService.signIn(this.logCustomerForm?.value).subscribe((response: any)=>{ 
      localStorage.setItem('token', response.token)
      this.toastr.success('Welcome to library', 'Hello')
      this.route.navigate(['/welcome']);
    }, (error: any)=>{
      console.log(error)
    })
  }

}
