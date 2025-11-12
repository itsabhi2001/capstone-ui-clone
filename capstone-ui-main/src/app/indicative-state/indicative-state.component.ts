import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {CapStoneService} from '../cap-stone.service';


@Component({
  selector: 'app-indicative-state',
  templateUrl: './indicative-state.component.html',
  styleUrls: ['./indicative-state.component.css']
})
export class IndicativeStateComponent implements OnInit{
  form: any = FormGroup;
  submitted = false;
  isError = false;
  loading = false;
  errorMsg: any;
  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private capStoneService: CapStoneService
  ) {}


  ngOnInit(){

    this.form = this.formBuilder.group({
      state: ['', Validators.required],
      debt : ['', Validators.required],
      
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    
  }
}
