import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormArray} from "@angular/forms"
import {CapStoneService} from '../cap-stone.service';
import {ActivatedRoute, Router} from "@angular/router";
import { InitialCheck } from '../model/initialCheck';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { empty } from 'rxjs';
@Component({
  selector: 'app-initial-multi-form',
  templateUrl: './initial-multi-form.component.html',
  styleUrls: ['./initial-multi-form.component.css'],
  
})
export class InitialMultiFormComponent implements OnInit {
  public debt: number = 0;
  onSliderChange(slider: any) {
    this.debt = slider.value;
  }
  cardContent = 'test';
  lenderOptions: string[] = [
    'Zions Bank', 'Woodforest National Bank', 'Wells Fargo', 'US Bank', 'Unknown',
    'TD Bank', 'TCF National Bank', 'Synovus Bank', 'Synchrony Bank', 'SunTrust',
    'Sterling National Bank', 'State Farm Bank', 'Southside Bank', 'South State Bank', 'Sofi',
    'Simmons Bank', 'Santander', 'Renasant Bank', 'Regions Bank', 'Prosperity Bank',
    'PNC Bank', 'Pinnacle Bank', "People's United Bank", 'Old National Bank', 'Navy Federal Credit Union',
    'MidFirst Bank', "M&T Bank", 'KeyBank', 'Investar Bank', 'Huntington Bank', 'HSBC', 'Great Western Bank',
    'Frost Bank', 'First Republic Bank', 'First National Bank of Omaha', 'First Merchants Bank',
    'First Citizens Bank', 'Discover', 'Comerica', 'Citibank', 'Chase', 'Charles Schwab', 'Capital One',
    'Cadence Bank', 'BMO Harris', 'BBVA Compass', 'BB&T', 'Bank OZK', 'Bank of America', 'Arvest Bank',
    'American Express', 'Ally Bank'
  ];
  sortedLenders = this.lenderOptions.sort((a, b) => a.localeCompare(b));

  stateNameToAbbreviation: { [state: string]: string } = {
      'Alabama': 'AL',
      'Alaska': 'AK',
      'Arizona': 'AZ',
      'Arkansas': 'AR',
      'California': 'CA',
      'Colorado': 'CO',
      'Connecticut': 'CT',
      'Delaware': 'DE',
      'Florida': 'FL',
      'Georgia': 'GA',
      'Hawaii': 'HI',
      'Idaho': 'ID',
      'Illinois': 'IL',
      'Indiana': 'IN',
      'Iowa': 'IA',
      'Kansas': 'KS',
      'Kentucky': 'KY',
      'Louisiana': 'LA',
      'Maine': 'ME',
      'Maryland': 'MD',
      'Massachusetts': 'MA',
      'Michigan': 'MI',
      'Minnesota': 'MN',
      'Mississippi': 'MS',
      'Missouri': 'MO',
      'Montana': 'MT',
      'Nebraska': 'NE',
      'Nevada': 'NV',
      'New Hampshire': 'NH',
      'New Jersey': 'NJ',
      'New Mexico': 'NM',
      'New York': 'NY',
      'North Carolina': 'NC',
      'North Dakota': 'ND',
      'Ohio': 'OH',
      'Oklahoma': 'OK',
      'Oregon': 'OR',
      'Pennsylvania': 'PA',
      'Rhode Island': 'RI',
      'South Carolina': 'SC',
      'South Dakota': 'SD',
      'Tennessee': 'TN',
      'Texas': 'TX',
      'Utah': 'UT',
      'Vermont': 'VT',
      'Virginia': 'VA',
      'Washington': 'WA',
      'West Virginia': 'WV',
      'Wisconsin': 'WI',
      'Wyoming': 'WY'
    };
    newPreLead = {
      firstName: '',
      lastname: '',
      debtSources: [{Lender: '', debtValue: 0}]
    }
    constructor(
      private builder:FormBuilder,
      private capStoneService: CapStoneService,
      private router: Router
      )
      {}
    isLinear = true;
    ngOnInit(): void {
    
    }
    isError = false;
    isApproved = false;
    Msg = "";
    states = [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
      'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
      'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
      'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
      'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
      'Wisconsin', 'Wyoming'
    ];

    offerPlans: any[] = [];

    Leadregister = this.builder.group({

      indicativeState: this.builder.group({
        state: new FormControl('', Validators.required),
        debt: new FormControl(this.debt, Validators.required), 
      }),
      leadForm: new FormArray([this.getLeadFields()]),


      registerForm: this.builder.group({
        username : ['', Validators.required],
        password : ['', Validators.required],
      }),



    });



    get indicState(){
      return this.Leadregister.get("indicativeState") as FormGroup;
    }
    get newLead(){
      return this.Leadregister.get("leadForm") as FormArray;
    }
    get regNewLead(){
      return this.Leadregister.get("registerForm") as FormGroup;
    }



    getLeadFields(): FormGroup {
      return new FormGroup({
        lender_name: new FormControl('', Validators.required),
        debt_owed: new FormControl('', Validators.required),
      });
    }

    leadListArray(){
      return this.Leadregister.get('leadForm') as FormArray;
    }

    addDebtSource() {
      this.leadListArray().push(this.getLeadFields());
    }

    removeDebtSource(i: number) {
      this.leadListArray().removeAt(i);
    }

    
    getFormData() {
        let serverData: any = [],
        tempLeadFormData = JSON.parse(JSON.stringify(this.Leadregister.value));
      tempLeadFormData.leadForm.forEach((element: any) => {
        let tempObj: any = {
          Lender: element.lender_name,
          Debt: element.debt_owed,
        };
        serverData.push(tempObj);
      });
      this.capStoneService.lenderLeadSubmit(serverData).subscribe(
        (offerPlans) => {
          
          this.offerPlans = offerPlans;
        },
        (error) => {
          console.error('Error fetching JSON array:', error);
          // Handle the error
        }
        
      );

    

    }
    selectOffer(item: any) {
      localStorage.setItem("chosenOffer", JSON.stringify(item));
      this.router.navigate(['/register']);
    }
    findEligibility(){
      this.isError = false;
      const state = this.indicState.get('state')?.value;
      const stateAbbreviation = this.stateNameToAbbreviation[state];
      if(!state ){
        this.Msg= "Please select a state to proceed. It is a required field."
        return;
      }
      this.capStoneService.indicativeCheck(this.debt, stateAbbreviation).subscribe(
        (resp) => {
          if (resp == 200) {
            this.isApproved = true;
            this.Msg = 'Congratulations! You are approved for our program. Proceed by clicking the "Next" button.';
          } else if (resp == 301) {
            this.isApproved = false;
            this.Msg = "Apologies, but we do not offer programs for residents of the selected state. Please choose a different state to proceed.";
          } else if (resp == 302) {
            this.isApproved = false;
            this.Msg = "We currently do not provide programs for the entered debt. Please review your details and try again.";
          }
        },
        (error) => {
          console.log('ERRORRRRRR');
        }
      );
    }
    onSubmit() {
      const state = this.indicState.get('state')?.value;
      const stateAbbreviation = this.stateNameToAbbreviation[state];
      localStorage.setItem("selectedState", stateAbbreviation);
    }
    
}
