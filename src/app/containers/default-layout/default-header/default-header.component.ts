import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/views/pages/login/login.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private loginService: LoginService, private toastr: ToastrService) {
    super();
  }

  onLogout() {
     this.loginService.logOut().subscribe(response => {
       location.reload();
       this.toastr.info('Disconnected', 'Status')
     });
  }
}
