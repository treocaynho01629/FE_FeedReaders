import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../services/newsapi.service';
import { Feeds } from "../models/Feeds";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor(private service:NewsapiService, private title:Title) { }

  feeds: Feeds = new Feeds();
  apiCall: any;
  medias: Map<string, string> = new Map<string, string>();
  ranCates: Map<string, string> = new Map<string, string>();

  ngOnInit() {
    this.title.setTitle('RING!-NEWS');
    this.medias = this.service.medias;
    this.ranCates = new Map([...this.service.categories.entries()].sort((a, b) => 0.5 - Math.random()).splice(0, 3));
    this.loadFeeds()
  }

  ngOnDestroy(){
    this.apiCall.unsubscribe();
  }

  loadFeeds(): void {
    this.feeds.status = "loading";
    this.apiCall && this.apiCall.unsubscribe();
    this.apiCall = this.service.getNewsFeed('tin-moi-nhat')
      .subscribe((response) => {
        this.feeds = this.service.scrapFeeds(response);
      }, (error) => {
        console.error(error);
      })
  }
}
