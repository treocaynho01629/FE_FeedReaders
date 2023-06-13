import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import * as cheerio from 'cheerio';
import { Feeds } from "../models/Feeds";
import { Article } from "../models/Article";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { XMLParser } from 'fast-xml-parser';
import { DetailArticle } from "../models/DetailArticle";

//import
const RSS_SOURCE = environment.newsSource;
const CORS_API = environment.corsApi;
const CORS_KEY = environment.corsApiKey;

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  constructor(private http:HttpClient) {
  }

  categories: Map<string, string> = new Map<string, string>([
    [ 'thoi-su', 'Thời sự' ],
    [ 'khoa-hoc-cong-nghe', 'Khoa học - Công nghệ'],
    [ 'the-gioi', 'Thế giới'],
    [ 'kinh-te', 'Kinh tế'],
    [ 'xa-hoi', 'Xã hội' ],
    [ 'phap-luat', 'Pháp luật' ],
    [ 'van-hoa', 'Văn hoá' ],
    [ 'giao-duc', 'Giáo dục' ],
    [ 'the-thao', 'Thể thao' ],
    [ 'ho-so', 'Hồ sơ' ],
    [ 'quan-su', 'Quân sự' ],
    [ 'bien-dao-viet-nam', 'Biển đảo' ],
    [ 'suc-khoe', 'Y tế' ],
    [ 'dia-phuong', 'Địa phương' ],
  ]);
  medias: Map<string, string> = new Map<string, string>([
    [ 'video', 'Video' ],
    [ 'goc-nhin', 'Góc nhìn' ],
    [ 'anh', 'Ảnh' ],
    [ 'infographics', 'Infographics' ],
    [ 'emagazine', 'Megastory' ],
    [ 'ban-doc', 'Bạn đọc' ],
    [ 'giai-ma-muon-mat', 'Giải mã muôn mặt' ],
    [ 'anh-360', 'Ảnh 360' ],
  ]);

  //Fetch news from rss
  public getNewsFeed(cate: any) : Observable<any> {
    let HTTPOptions:Object = {
      params: {
        url: `${RSS_SOURCE}/${cate}.rss`
      },
      headers: new HttpHeaders({
        'X-RapidAPI-Key': CORS_KEY,
        'X-RapidAPI-Host': CORS_API,
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    return this.http.get('https://cors-proxy4.p.rapidapi.com/', HTTPOptions)
  }

  //Parse Rss xml to json
  public XmlToJson(xml: any) {
    const parser = new XMLParser();
    let json = parser.parse(xml);
    return json.rss.channel;
  }

  //Scrap feeds
  public scrapFeeds(xml: any) : Feeds {
    var json = this.XmlToJson(xml);
    var feeds = json.item;

    feeds.forEach(function (item: any){
      const $ = cheerio.load(item.description);
      const thumbnail = $('img').attr('src');
      const content = $.text();

      const link = item.link;

      var m = link.lastIndexOf('/');
      var n = link.lastIndexOf('/', m - 1);
      var cate = link.substring(n + 1, m);
      var path = link.substring(m + 1).trim();

      item.content = content;
      item.thumbnail = thumbnail;
      item.cate = cate;
      item.link = path;
    });

    var temp = json.title;
    let start = temp.indexOf("-") + 1;
    let end = temp.lastIndexOf("-") - 1;
    let title = temp.substr(start, end - start + 1);

    return new Feeds(feeds, title, 'ok');
  }

  //Get scrap Article
  public getCurrArticle(cate: string, path: string) : Observable<any> {
    let HTTPOptions:Object = {
      params: {
        url: `${RSS_SOURCE}/${cate}/${path}`
      },
      headers: new HttpHeaders({
        'X-RapidAPI-Key': CORS_KEY,
        'X-RapidAPI-Host': CORS_API,
        'Content-Type': 'text/html; charset=utf-8'
      }),
      responseType: 'text'
    };

    return this.http.get('https://cors-proxy4.p.rapidapi.com/', HTTPOptions);
  }

  //Scrap article from main page
  public scrapArticle(rawArticle: any) {
    const $ = cheerio.load(rawArticle);

    //Scrap main article
    let currArticle = new DetailArticle();
    const author = $('.author').first().text();
    const title = $('.detail-title').first().text();
    const pubDate = $('.date .txt').first().text();
    let fullContent : string = "";

    console.log($('.content').first().html())
    let children = $('.contents').first().children(); //Children of contents div
    if (children.length == 0) children = $('.box-text').first().children(); //diff name

    for(let i = 0; i < children.length; i++){
      let fig = $(children[i]).find('figcaption');
      fig.css('text-align', 'center');

      let image = $(children[i]).find('img');
      image.attr('width', '100%');
      image.removeAttr('height');

      fullContent += $(children[i]).html();
    }

    //Relate feeds
    let related = new Feeds();

    let relatedDiv = $('.boxnews').last(); //Children of contents div
    const cateName = relatedDiv.find('h2').text();
    related.cateName = cateName;

    relatedDiv.find('.boxnews-item').each(function() {
      let title = $(this).find('h4').text();
      if (title.length == 0) title = $(this).find('a').text();
      const thumbnail = $(this).find('img').attr('src')!;
      const link = $(this).find('a').attr('href')!;

      var m = link.lastIndexOf('/');
      var n = link.lastIndexOf('/', m - 1);
      var cate = link.substring(n + 1, m);
      var path = link.substring(m + 1).trim();

      let article = new Article();
      article.title = title;
      article.thumbnail = thumbnail;
      article.cate = cate;
      article.link = path;

      related.feeds.push(article);
    })

    //Set article data
    currArticle.title = title;
    currArticle.pubDate = pubDate;
    currArticle.fullContent = fullContent;
    currArticle.author = author;
    related.status = "ok";
    currArticle.related = related;

    return currArticle;
  }

  //Sleep after request article to prevent blocking ip
  public sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
