import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {RegisterService} from '../services/registre.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm?: FormGroup;
  submitted = false;
  constructor(private registerService: RegisterService,
              private route: Router,
              private toastr: ToastrService) { }
  ngOnInit(): void {
    this.userForm = new FormGroup ({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
  })
}

register(){
this.submitted =true;
if (this.userForm?.invalid){
  return
}
this.registerService.signup(this.userForm?.value).subscribe(response=>{
this.toastr.success('user created', 'Hello')
}, error=>{
  console.log(error);
});
this.route.navigate(['/login']);
}
}

