import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, Validator } from '@angular/forms';
import {UserCrudService} from './../../user-crud.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private userCrudService :UserCrudService,
    private toastr: ToastrService,
    private router: Router) {
   }

  loginForm = this.fb.group({
    email : (''),
    password : ('')
  });

  ngOnInit(): void {
  }

  onSubmit()
  {
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    let data ={
      email,
      password
    };
    this.userCrudService.login(data).subscribe(res=>
      {
      
        if(res['success'] )
        {
          if(res['role'] === "admin")
          {
            let userInfo = JSON.stringify(res['data']);
            localStorage.setItem('token',res['token']);
            localStorage.setItem('userInfo',userInfo);
            this.router.navigate(['/admin/dashboard']);
          }
          else
          {
            this.router.navigate(['/users']);
          }
        }
        else
        {
          this.toastr.error(res['msg']);
        }
      });
  }

}
