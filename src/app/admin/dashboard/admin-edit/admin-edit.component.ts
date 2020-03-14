import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, Validator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {UserCrudService} from './../../../user-crud.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {

  constructor(private fb : FormBuilder,
     private route : ActivatedRoute,
     private userCrudService : UserCrudService,
     private toastr: ToastrService) { }
  id: string = this.route.snapshot.params.id;
  admineditForm = this.fb.group({
    name : (''),
    contact_number : (''),
    email : ('')
  });

  ngOnInit(): void {
    const name: string = this.route.snapshot.params.name;
    const contact_number : Number = this.route.snapshot.params.contact_number;
    const email : string = this.route.snapshot.params.email;

    this.admineditForm.controls['name'].setValue(name);
    this.admineditForm.controls['contact_number'].setValue(contact_number);
    this.admineditForm.controls['email'].setValue(email);

  }

  onSubmit()
  {
    const name = this.admineditForm.controls['name'].value;
    const contact_number = this.admineditForm.controls['contact_number'].value;
    const email = this.admineditForm.controls['email'].value;
    let data = {
      id:this.id,
      name,
      contact_number,
      email
    };
    
    this.userCrudService.updateUser(data).subscribe(res=>
      {
        if(res['success'])
        {
          this.toastr.success(res['msg'])
        }
        else
        {
          this.toastr.error(res['msg'])
        }
      })
  }

}
