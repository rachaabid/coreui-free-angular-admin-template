import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logForm?: FormGroup;
  submitted= false;
  constructor(private route: Router, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
  })
  }

  login(){
    this.submitted=true;
    if (this.logForm?.invalid){
      return
    }
    this.loginService.signIn(this.logForm?.value).subscribe((response: any)=>{ 
      localStorage.setItem('token', response.token)
      this.toastr.success('Welcome to dashboard', 'Hello')
      this.route.navigate(['/dashboard']);
    }, (error: any)=>{
      console.log(error)
    })
  }

}
