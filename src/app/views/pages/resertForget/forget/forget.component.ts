import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../login/login.service';
import {ForgetService} from '../services/forget.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
email: any = '';
forgetForm?: FormGroup;
logForm?: FormGroup;
submitted = false;
  constructor(private forgetService: ForgetService, private route: Router, private loginService: LoginService, private toastr: ToastrService) { }

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
    this.forgetService.forget(this.forgetForm?.value).subscribe((response: any)=>{
      this.toastr.info('Email sent', 'Hello');
    }, (error: any)=>{
    console.log(error)
    });
  }

  login(){
    this.submitted=true;
    if (this.forgetForm?.invalid){
      return
    }
    this.loginService.signIn(this.logForm?.value).subscribe((response: any)=>{
      this.toastr.success('Welcome to dashboard', 'Hello')
      this.route.navigate(['/dashboard']);
    }, (error: any)=>{
      console.log(error)
    })
  }

}

