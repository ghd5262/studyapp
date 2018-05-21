import { Injectable } from '@angular/core';

/*
  Generated class for the CrewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CrewProvider {

  public items: Array<any> = [];

  constructor() {
    console.log('Hello CrewProvider Provider');
  }

  crewListLoad() {}

}
