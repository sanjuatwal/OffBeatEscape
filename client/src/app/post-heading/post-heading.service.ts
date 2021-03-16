import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostHeadingService {
    
    constructor(private http: HttpClient) { }
    
    getPostDetails(postId: string): Observable<any> {
        return this.http.get('http://localhost:3000/post/posts/' + postId).pipe(
            map((res: any) => {
            console.log(res);
            return res;
        }),
            catchError(this.handleError)
        );
    }

    addCommentOnAPost(commentRequestData: any, postId: string): Observable<any> {
        return this.http.patch('http://localhost:3000/post/addComment/' + postId, commentRequestData).pipe(
            map((res: any) => {
            console.log(res);
            return res;
        }),
            catchError(this.handleError)
        );
    }

    savePost(postId: string, userName: string) {
        return this.http.patch('http://localhost:3000/users/savePost/' + postId, userName).pipe(
            map((res: any) => {
            console.log(res);
            return res;
        }),
            catchError(this.handleError)
        );
      }
   
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }

}
