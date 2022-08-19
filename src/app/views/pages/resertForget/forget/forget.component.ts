import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../login/services/login.service';
import {ForgetPasswordService} from '../services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
email: any = '';
forgetForm?: FormGroup;
logForm?: FormGroup;
submitted = false;
  constructor(private forgetService: ForgetPasswordService, private route: Router, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logForm =new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password :  new FormControl('', Validators.required)
  }) 
    this.forgetForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
  })
  }

  forgetPassword(){
    this.forgetService.forget(this.forgetForm?.value).subscribe(response=>{
      this.toastr.info('Email sent', 'Hello');
    }, error=>{
    console.log(error)
    });
  }

  login(){
    this.submitted=true;
    if (this.forgetForm?.invalid){
      return
    }
    this.loginService.signIn(this.logForm?.value).subscribe(response=>{
      this.toastr.success('Welcome to dashboard', 'Hello')
      this.route.navigate(['/dashboard']);
    }, error=>{
      console.log(error)
    })
  }

}

