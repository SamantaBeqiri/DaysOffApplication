import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username = ''
  password = ''
  invalidLogin = false

  loginForm: FormGroup;
 
  constructor(private router: Router,
    private loginservice: AuthenticationService, private formBuilder: FormBuilder ) { 
      this.loginForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    if(this.loginservice.isUserLoggedIn){
      console.log("ola")
    }
    }

  ngOnInit() {
  }

  checkLogin() {
    
    this.loginservice.authenticate(this.loginForm.getRawValue().username, this.loginForm.getRawValue().password).subscribe(
     data => {
      this.router.navigate(['nav'])
       console.log("success")
      
        this.invalidLogin = false
      },
      error => {
        console.log("error")
        this.invalidLogin = true

      }
    )
    

  }
}
