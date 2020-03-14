import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,AbstractControl } from '@angular/forms';
import {UserCrudService} from './../../user-crud.service';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

import { MustMatch } from './../../helpers/must-match.validator';
import {phoneLength} from './../../helpers/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder,
     private userCrudService :UserCrudService,
     private toastr: ToastrService,
     private _snackBar: MatSnackBar) { }

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  signupForm = this.fb.group({
  name : ['',Validators.required],
  c_number : [''], 
  email : ['',[Validators.required,Validators.pattern(this.emailPattern)],this.varifyEmail.bind(this)],
  password : ['',[Validators.required,Validators.minLength(6)]],
  confirm_password : ['',Validators.required]
},{
  validator: [MustMatch('password', 'confirm_password'),phoneLength('c_number')]
},
)
submitted = false;

  ngOnInit(): void {

    return;
  }

  get f() { 
    return this.signupForm.controls;
   }

  varifyEmail(control: AbstractControl)
  {
    let data={email:control.value};
    return this.userCrudService.checkEmailExists(data).subscribe(res=>
      {
        if(res['success'])
        {
          this.signupForm.controls['email'].setErrors({'emailAlreadyExists':true})
        }
      })
  }

  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    let name = this.signupForm.controls['name'].value;
    let c_number = this.signupForm.controls['c_number'].value;
    let email = this.signupForm.controls['email'].value;
    let password = this.signupForm.controls['password'].value;
    let confirm_password = this.signupForm.controls['confirm_password'].value;
    let data = {
      name,
      contact_number:c_number,
      email,
      password
    };
    this.userCrudService.register(data).subscribe(res=>
      {
        if(res['success'])
        {
          // this.toastr.success(res['msg']);
          this._snackBar.open(res['msg'], 'Close', {
            duration: 20000,
            verticalPosition : "top",
            panelClass:['snackClass']
          });
          this.submitted = false;
          this.signupForm.reset();
        }
        else
        this.toastr.error(res['msg']);
      })
  }

}
