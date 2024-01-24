import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'People Application';
  date = '';
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get('http://worldtimeapi.org/api/timezone/America/Vancouver/')
      .subscribe((data)=>{
        //console.log(data);
        var obj:any = <Object>data;
        this.date = obj.datetime;
      })
  }
}
