import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserAuthService } from '../../Servies/Users/user-auth.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: UserAuthService,private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = this.cookieService.get('accessToken');

    if (accessToken) {
      // If accessToken is available, attach it to the request
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // If we get a 401 Unauthorized error, try to refresh the token
          return from(this.authService.refreshAccessToken()).pipe(
            switchMap((newAccessToken: string) => {
              // Store the new accessToken in cookies and localStorage
              this.cookieService.set('accessToken', newAccessToken);
              localStorage.setItem('accessToken', newAccessToken);

              // Retry the original request with the new access token
              const newRequest = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${newAccessToken}`)
              });

              return next.handle(newRequest);
            }),
            catchError((err) => {
              // If refresh fails, log out the user or handle the error
              this.authService.logoutUser();
              return throwError(err);
            })
          );
        } else {
          // For other errors, pass the error through
          return throwError(error);
        }
      })
    );
  }
}
