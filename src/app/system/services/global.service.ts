import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  navbarBehavior: BehaviorSubject<string> = new BehaviorSubject('');
  activeRouteBehavior: BehaviorSubject<string> = new BehaviorSubject('');
  actionControlBehavior: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
