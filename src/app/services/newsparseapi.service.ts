import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

//import
const API_URL = environment.apiUrl;
const RSS_SOURCE = environment.newsSource;

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class NewsParseAPIService {

  constructor(private http:HttpClient) {
  }

  currArticles: any;
  currCate: any;
  categories = [
    {name: 'Thời sự', url: 'thoi-su.rss'},
    {name: 'Khoa học - Công nghệ', url: 'khoa-hoc-cong-nghe.rss'},
    {name: 'Kinh tế', url: 'kinh-te.rss'},
    {name: 'Xã hội', url: 'xa-hoi.rss'},
    {name: 'Pháp luật', url: 'phap-luat.rss'},
    {name: 'Văn hoá', url: 'van-hoa.rss'},
    {name: 'Giáo dục', url: 'giao-duc.rss'},
    {name: 'Thể thao', url: 'the-thao.rss'},
    {name: 'Hồ sơ', url: 'ho-so.rss'},
    {name: 'Quân sự', url: 'quan-su.rss'},
  ];

  //Fetch bài từ rss
  getNewsFeed(url: any):Observable<any>{
    return this.http.get(`${API_URL}api.json?rss_url=${RSS_SOURCE}${url}`);
  }

  //Cắt tỉa content
  snippetContent(feed: any){
    feed.items.forEach(function (item: any){

      var temp = item.content;
      temp = temp.replace("<span>", "");
      temp = temp.replace("</span>", "");
      let start = temp.lastIndexOf(">") + 1;
      let end = temp.length;

      item.content = temp.substr(start, end - start + 1);
    });
    return feed;
  }
}
