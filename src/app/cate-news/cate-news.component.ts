import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../services/newsapi.service';
import {ActivatedRoute} from "@angular/router";
import { Feeds } from '../models/Feeds';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cate-news',
  templateUrl: './cate-news.component.html',
  styleUrls: ['./cate-news.component.scss']
})
export class CateNewsComponent implements OnInit {

  constructor(private service:NewsapiService, private activeRoute:ActivatedRoute, private title:Title) { }

  feeds: Feeds = new Feeds();
  currCate: string = "";
  apiCall: any;
  ranCates: Map<string, string> = new Map<string, string>(); //for carousel

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({ cate }) => {
      //Set title
      const fullCates = new Map([...this.service.categories, ...this.service.medias]);
      this.title.setTitle('RING!-NEWS - ' + fullCates.get(cate)!);

      //Get random cate for carousel
      let cates = new Map([...this.service.categories]);
      cates.delete(cate);
      this.ranCates = new Map([...cates.entries()].sort((a, b) => 0.5 - Math.random()).splice(0, 3));
      this.currCate = cate;

      //Load feeds
      this.loadFeeds(cate)
    });
  }

  ngOnDestroy(){
    this.apiCall.unsubscribe();
  }

  loadFeeds(cate: string): void {
    this.feeds.status = "loading";
    this.apiCall && this.apiCall.unsubscribe();
    this.apiCall = this.service.getNewsFeed(cate)
      .subscribe((response) => {
        this.feeds = this.service.scrapFeeds(response);
      }, (error) => {
        console.error(error);
    })
  }
}
