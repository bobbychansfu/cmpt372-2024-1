import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  people:any[] = []
  constructor(private http: HttpClient) {
    // call the data service for the people
    
    // this.people = [
    //   {
    //     name: 'john',
    //     instructor: false,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'bobby',
    //     instructor: false,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'jenny',
    //     instructor: true,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'jane',
    //     instructor: true,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'steve',
    //     instructor: true,
    //     added_on: new Date().getTime()
    //   }
    // ]
   }

   get() {
    // get people-list from storage ...
    // return this.people
    return this.http.get<any []>('http://localhost:8080/people-api/all')
   }

   add(newPerson:any){
    // newPerson.added_on = (new Date()).getTime()
    // this.people.push(newPerson)
    // // update the people-list on the storage ...
    // console.log(this.people)
    return this.http.post('http://localhost:8080/people-api/add', newPerson)
   }

   delete(del_person:string){
    this.people = this.people.filter((p) => p.name != del_person)
    // update the people-list on the storage ...
    return this.people
   }
}
