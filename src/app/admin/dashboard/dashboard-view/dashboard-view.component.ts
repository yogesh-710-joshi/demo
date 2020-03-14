import { Component, OnInit } from '@angular/core';
import {UserCrudService} from './../../../user-crud.service';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserSearchService} from './../../../user-search.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  users : any = [];
  userInfo : {};
  p = 1;
  key :string = "";

  constructor(private userCrudService : UserCrudService,
     private toastr : ToastrService,
     private spinner: NgxSpinnerService,
     private snackbar : MatSnackBar,
     private usersearch : UserSearchService) {
       //this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      }


  ngOnInit(): void {
    this.p =1;
    this.spinner.show();
    this.usersearch.key.subscribe(key =>{
      this.key = key;
      if(key == "")
      {
        this.userCrudService.getAllUsers().subscribe(res=>
          {
            setTimeout(() => {
              this.spinner.hide();
              this.users = res['data'];
            }, 1000);
          })
      }
      else
      {
        this.usersearch.users.subscribe(user=>
          {
            this.users = user
          })
      }
    })
  }

  removeUser(id:any)
  {
    let data={id};
    this.spinner.show();
    this.userCrudService.removeUser(data).subscribe(res=>
      {
        setTimeout(() => {
        if(res['success'])
        {
          this.snackbar.open(res['msg'], 'Close', {
            duration: 10000,
            verticalPosition : "top",
            panelClass:['snackClass']
          });
          this.users = res['data'];
        }
        else{
          this.toastr.error(res['msg'])
        }
        this.spinner.hide();
      },1000)
      })
  }

}
