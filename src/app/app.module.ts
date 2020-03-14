import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule, NG_VALIDATORS} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import {UserCrudService} from './user-crud.service';
import {UserAuthenticationService} from './user-authentication.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {InterceptorsService} from './interceptors.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports:[NgxSpinnerModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  providers: [UserCrudService,UserAuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true},
    {provide: NG_VALIDATORS, useExisting:SignUpComponent ,
       multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
