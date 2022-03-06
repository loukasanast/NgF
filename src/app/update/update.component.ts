import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  name: string;
  city: string;
  year: number;
  id: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:3001/api/teams/' + this.id).pipe(
      retry(1),
      catchError((this.handleError))
    ).subscribe((data: any) => {
      this.name = data.name;
      this.city = data.city;
      this.year = data.year;
    });
  }

  update(e) {
    this.http.put('http://localhost:3001/api/teams/' + this.id, { name: this.name, city: this.city, year: this.year }).pipe(
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
