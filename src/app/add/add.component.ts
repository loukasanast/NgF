import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  name: string;
  city: string;
  year: number;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  add(e) {
    this.http.post('http://localhost:3001/api/teams', { name: this.name, city: this.city, year: this.year }).pipe(
      retry(1),
      catchError((this.handleError))
    ).subscribe((data: any) => {
      this.router.navigate(['/'])
    });
  }

  handleError(error) {
    window.alert(error.message);
    return throwError('An error occurred.');
  }
}
