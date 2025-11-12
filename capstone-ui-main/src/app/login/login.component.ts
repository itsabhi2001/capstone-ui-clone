import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CapStoneService} from "../cap-stone.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = FormGroup;
  loading = false;
  submitted = false;
  isError = false;
  errorMsg :any;
  username: any;
  password: any;

  isRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private capStoneService: CapStoneService
  ) {
  }

  ngOnInit() {
    let isRegister =  localStorage.getItem('isRegister')
    if(isRegister == 'true'){
      this.isRegister =true;
    }
    localStorage.setItem('isRegister','');

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isError=false;
    let username = this.f.username.value;

    this.capStoneService.login(this.f.username.value,this.f.password.value).pipe().subscribe(
      (resp) =>{
        this.router.navigate(['/dashboard'], { state: { responseData: resp } });
      },
      error => {
        if(error.status === 403){
          this.isError = true;
          this.errorMsg="Username/Password is incorrect"
        }
        console.log("Error not able to login")
      }
    )


  }

}
