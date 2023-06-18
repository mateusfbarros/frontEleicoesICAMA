import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Calcme } from '../models/calcme';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class CalcmeService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Calcme[]>{
    const url = `${this.baseUrl}/all`
    return this.http.get<Calcme[]>(url);
  }

  create(calcme: Calcme):  Observable<Calcme>{
    const url = `${this.baseUrl}/create`
    return this.http.post<Calcme>(url, calcme);
  }

  delete(id: string): Observable<any>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void{
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
