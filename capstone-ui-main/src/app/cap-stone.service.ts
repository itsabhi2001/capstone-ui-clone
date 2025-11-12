import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';  
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "./model/user";
import {environment} from "../environments/environment";
import { InitialCheck } from './model/initialCheck';
import { InitialPlans } from './model/initialPlans';


@Injectable({
  providedIn: 'root'
})
export class CapStoneService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  private initialCheckSubject: BehaviorSubject<InitialCheck | null>;
  public initialCheck: Observable<InitialCheck | null>;
  
  public initialPlansSubject: BehaviorSubject<InitialPlans | null>;
  public initialPlans: Observable<InitialPlans | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

    this.initialCheckSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('initialCheck')!));
    this.initialCheck = this.initialCheckSubject.asObservable();

    this.initialPlansSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('initialPlans')!));
    this.initialPlans = this.initialPlansSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

   registerUser(firstName: string, lastName: string, username: string, password: string, offer: JSON, state: string, dob:string){
    return this.http.post<User>(`${environment.apiUrl}/register`,{firstName, lastName, username, password, offer, state, dob})
      .pipe((map(user=>{
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })))
  }

  indicativeCheck(balance: number, state: string): Observable<number>{
      return this.http
      .post<InitialCheck>(
        `${environment.initialCheckUrl}/indicativeOffer/check`,
        { state, balance }
      )
      .pipe(
        map((initialCheck) => {
          localStorage.setItem('initialCheck', JSON.stringify(initialCheck));
          this.initialCheckSubject.next(initialCheck);
          return initialCheck.code;
        })
      ) as Observable<number>;

      
      
  }


  lenderLeadSubmit(checkArray: { Lender: string; Debt: number }[]): Observable<any[]>{
    const requestData = checkArray.map(item => ({
      name: item.Lender,
      debt_amount: item.Debt
    }));
    return this.http.post<InitialPlans>(`${environment.initialCheckUrl}/offer/getOffer`, requestData)
      .pipe(
        map(initialPlans => {
          localStorage.setItem('initialPlans', JSON.stringify(initialPlans));
          this.initialPlansSubject.next(initialPlans);
          return initialPlans.offerList;
        })
      ) as Observable<any[]>;
  }





}
