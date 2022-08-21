import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ResetPasswordComponent } from './resertForget/reset-password/reset-password.component';
import { ForgetComponent } from './resertForget/forget/forget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCustomerComponent } from './loginCustomer/login-customer/login-customer.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    ResetPasswordComponent,
    ForgetComponent,
    LoginCustomerComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule {
}
