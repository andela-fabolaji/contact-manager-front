import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private api: string = '/api';

  constructor(private http: HttpClient) {}

  index(context: string): Observable<any> {
    return this.http
      .get(`${this.api}/${context}`)
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError(`get ${context}`, {}))
      );
  }

  save(context: string, payload: any): Observable<any>{
    return this.http
      .post(`${this.api}/${context}`, payload)
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError(`save ${context}`, {}))
      );
  }

  update(context, id, payload): Observable<any>{
    return this.http
      .put(`${this.api}/${context}/${id}`, payload)
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError(`update ${context}`, {}))
      );
  }

  delete(context: string, id: string): Observable<any> {
    return this.http
      .delete(`${this.api}/${context}/${id}`)
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError(`delete ${context}`, {}))
      );
  }

  handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      result['error'] = error;
      return of(result as T);
    }
  }
}