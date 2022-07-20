import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsapiservicesService {

  constructor(private _http:HttpClient) { }

  //Top news api
  newsApiUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://baotintuc.vn/tin-moi-nhat.rss";

  //Tech news api
  techApiUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://baotintuc.vn/khoa-hoc-cong-nghe.rss";

  //Get top news
  topHeading():Observable<any>{
    return this._http.get(this.newsApiUrl);
  }

  //Get tech news
  techNews():Observable<any>{
    return this._http.get(this.techApiUrl);
  }
}
