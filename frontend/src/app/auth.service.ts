 
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

 

@Injectable({

    providedIn: 'root',

})

 

export class AuthService {

    private apiUrl = 'http://localhost:8080/api/auth/token';

    constructor(private httpclient: HttpClient) { }

 

    login(username: string, password: string){

        const body = { username, password };

        return this.httpclient.post(`${this.apiUrl}`, body).pipe(

            tap( (res:any) => {

                localStorage.setItem('token',res['token']);

            }),

            catchError((error: HttpErrorResponse) => {

                console.error('Authentication error:', error);

                return throwError(error);

            })

        );

    }

 

    setToken(token: string): void {

        localStorage.setItem('token', token);

    }

 

    getToken(): string | null {

        return localStorage.getItem('token');

    }

 

    getHeaders(): HttpHeaders {

        const token = this.getToken();

        return new HttpHeaders({

            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,

        });

    }

}