import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CapStoneService} from '../cap-stone.service';
import { first } from 'rxjs/operators';
import { NullLogger } from '@angular-devkit/core/src/logger';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  displayedOffer: any; 
  registerForm: any = FormGroup;
  loading = false;
  submitted = false;
  isError = false;
  errorMsg: any;
  isRegister = true;
  dob: Date | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private capStoneService: CapStoneService
  ) {
   
  }

  
  ngOnInit(){
    const chosenOffer = localStorage.getItem('chosenOffer');
    if (chosenOffer !== null) {
      try {
        this.displayedOffer = JSON.parse(chosenOffer);
        console.log('Parsed Offer:', this.displayedOffer);
      } catch (error) {
        console.error('Error parsing chosenOffer:', error);
      }
    } else {
      console.warn('No chosenOffer found in localStorage.');
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required],
      dob: [null, Validators.required],
    });
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    let dob = '';
    if (this.dob !== null) {
      dob = this.formatDate(this.dob);
    }
    this.submitted = true;
    const state = localStorage.getItem('selectedState') || 'No state';

    this.capStoneService.registerUser(this.f.firstName.value, this.f.lastName.value, this.f.username.value, this.f.password.value,this.displayedOffer, state, dob ).pipe().subscribe(
      (resp) =>{
        this.router.navigate(['/login']);
        localStorage.setItem('isRegister','true');
      },
      error => {
        if(error.status == 405){
          this.isError = true;
          this.errorMsg = "Username already exists";
        }
        else if(error.status == 404){
          this.isError = true;
          this.errorMsg =  "Username not found";
        }
        this.router.navigate(['/register'])
      }
    )


  }
}
