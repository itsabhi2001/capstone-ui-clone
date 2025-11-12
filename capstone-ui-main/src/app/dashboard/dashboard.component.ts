import { Component,AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras} from "@angular/router";
import { trigger, state, style, transition, animate } from '@angular/animations';

import Chart from 'chart.js/auto';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0%)',
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-100%)',
      })),
      transition('open <=> closed', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class DashboardComponent implements AfterViewInit{
  customer: any;
  offer: any = {};
  showCustomerDetails: boolean = false;
  seperateCreditorData: { creditorName: string, settlementRate: number, settlementCost: number }[] = [];
  data : any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.data = this.router.getCurrentNavigation()?.extras.state;
    this.processResponseData(this.data.responseData);
  }

  toggleCustomerDetails() {
    this.showCustomerDetails = !this.showCustomerDetails;
  }

  processResponseData(responseData: any[]) {
    for (const response of responseData) {
      console.log(response)
      this.offer = response.offer;
      this.customer = this.offer.customer;

      const eachCreditorInfo = {
        creditorName: response.creditorName,
        settlementRate: response.settlementRate,
        settlementCost: response.settlementCost
      };
      
      this.seperateCreditorData.push(eachCreditorInfo);

     
    }
  }
  logout(){
    this.router.navigate(['/login'])
  }
  
  barChartData = {
    labels: ['Debt', 'Settled Debt','Cost of Program'],
    datasets: [{
      label: '',
      data: [3000, 500, 400],
      backgroundColor: ['rgba(0, 128, 0, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(128, 0, 128, 0.2)', 'rgba(128, 0, 128, 0.2)'],
      borderColor: ['rgba(0, 128, 0, 1)', 'rgba(54, 162, 235, 1)', 'rgba(128, 0, 128, 1)', 'rgba(128, 0, 128, 1)'],      
      borderWidth: 1
    }]
  };

  pieChartData = {
    labels: ['Subscription Fees', 'Total Settled Debt', 'Program Fees'],
    datasets: [{
      data: [500, 1000,400],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(128, 0, 128, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(128, 0, 128, 1)'],
      borderWidth: 1
    }]
  };

  ngAfterViewInit() {
    this.barChartData.datasets[0].data = [this.offer.debt, this.offer.totalSettlementCost, this.offer.totalCostOfProgram];
    this.pieChartData.datasets[0].data = [this.offer.monthlyFees, this.offer.totalSettlementCost, this.offer.programFees];

    this.renderCharts();
  }

  private renderCharts() {
    const ctxBar = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctxBar, {
      type: 'bar',
      data: this.barChartData,
      options: {
        indexAxis: 'y'
      }
    });

    const ctxPie = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctxPie, {
      type: 'pie',
      data: this.pieChartData
    });
  }

}





