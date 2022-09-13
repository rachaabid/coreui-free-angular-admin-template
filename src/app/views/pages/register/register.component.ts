import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {RegistreService} from '../register/registre.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm?: FormGroup;
  submitted = false;
  constructor(private registerService: RegistreService,
              private route: Router,
              private toastr: ToastrService) { }
  ngOnInit(): void {
    this.userForm = new FormGroup ({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      type: new FormControl('')
  })

}

register(){
this.submitted =true;
if (this.userForm?.invalid){
  return
}
this.registerService.signup(this.userForm?.value).subscribe((response: any)=>{

  if (this.userForm?.value['role'] === 'Admin'){
    this.toastr.success('Admin created', 'Hello')
    this.route.navigate(['/login']);
  }

if (this.userForm?.value['role'] === 'Customer'){
    this.toastr.success('Customer created', 'Hello')
    this.route.navigate(['/loginCustomer']);
  }

}, (error: any)=>{
  console.log(error);
});
}
}

