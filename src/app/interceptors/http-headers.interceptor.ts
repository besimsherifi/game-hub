import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{

    constructor() {} 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       req = req.clone({
           setHeaders:{
            'x-rapidapi-key' : 'b628909c50msh75f89a18c663638p1fd8fajsn8b1a402f00f1',
            'x-rapidapi-host' : 'rawg-video-games-database.p.rapidapi.com',
           },
           setParams:{
               key: 'bb605540416542a7a494202bd7991dba'
           }
       });
       return next.handle(req);
    }
    
}