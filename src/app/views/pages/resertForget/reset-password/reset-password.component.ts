import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ResetPasswordService} from '../services/reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
 resetForm?: FormGroup;
 submitted = false;
 token: any;
 message: any;
  constructor(private resetService: ResetPasswordService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup ({
      password: new FormControl ('', Validators.required),
      confirmPassword: new FormControl ('', Validators.required)
    })
  }

  resetPassword(){
    this.submitted = true;
    if (this.resetForm?.invalid){
      return
    }
    this.resetService.reset(this.token, this.resetForm?.value).subscribe((response: any)=>{
      this.toastr.info('Your password has been reset', 'Reset password')
    }, (error: any)=>{
     console.log(error);
    });
  }

}

