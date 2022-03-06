import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teams: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/api/teams').pipe(
      retry(1),
      catchError((this.handleError))
    ).subscribe((data: any) => {
      this.teams = data;
    });
  }

  handleError(error) {
    window.alert(error.message);
    return throwError('An error occurred.');
  }

  delete(e, id) {
    let elem;
    this.http.delete('http://localhost:3001/api/teams/' + id).pipe(
      retry(1),
      catchError((this.handleError))
    ).subscribe((data: any) => {
      if(e.target.nodeName === 'SPAN') {
        elem = e.target.parentNode.parentNode.parentNode;
      } else if(e.target.nodeName === 'BUTTON'){
        elem = e.target.parentNode.parentNode;
      } 
      elem.parentNode.removeChild(elem);
    });
  }

}
