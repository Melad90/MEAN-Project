import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable, Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "Ett okänd fel uppstod!";
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.snackBar.open(ErrorComponent, {data: {message: errorMessage}});
                return throwError(error);
            })
        );
    }
}