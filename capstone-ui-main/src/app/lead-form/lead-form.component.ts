import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {CapStoneService} from '../cap-stone.service';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent implements OnInit{
  form: any = FormGroup;
  isError = false;
  errorMsg: any;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private capStoneService: CapStoneService
  ) {}


  ngOnInit(){

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      salary: ['', Validators.required],
      debt : ['', Validators.required],
      debtCompanies : ['', Validators.required],
      dob : ['', Validators.required],
      address : ['', Validators.required],
      email : ['', Validators.required],
      monthlyBudget : ['', Validators.required],
    });
  }


  get f() {
    return this.form.controls;
  }


  onSubmit() {

  
    this.submitted = true;
    this.router.navigate(['/']); 


  }


}
