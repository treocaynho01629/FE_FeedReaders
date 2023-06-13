import { Component, OnInit } from '@angular/core';
import { NewsapiService } from "../services/newsapi.service";
import { Feeds } from "../models/Feeds";

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  constructor(private service:NewsapiService) { }

  latest: Feeds = new Feeds();
  feeds: Feeds[] = [];
  apiCalls: any[] = [];

  ngOnInit(): void {
    let merge = new Map([...this.service.categories, ...this.service.medias]);
    let ranCates = new Map([...merge.entries()].sort((a, b) => 0.5 - Math.random()).splice(0, 3));
    this.loadFeeds(ranCates);
  }

  ngOnDestroy(){
    this.unsubAll();
  }

  unsubAll(){
    this.apiCalls.forEach((apiCall) => {
      apiCall.unsubscribe();
    })

    this.latest.status = "loading";

    this.feeds.forEach((feed) => {
      feed.status = "loading";
    })
  }

  loadFeeds(ranCates: Map<string, string>){
    this.unsubAll();

    let apiCall = this.service.getNewsFeed('tin-moi-nhat').subscribe((result)=>{
      this.latest = this.service.scrapFeeds(result);
      this.latest.status = "ok";
    })
    this.apiCalls.push(apiCall);

    ranCates.forEach((value, key) => {
      let apiCall = this.service.getNewsFeed(key).subscribe((result)=>{
        let feed = this.service.scrapFeeds(result);
        feed.status = "ok";
        this.feeds.push(feed);
      })
      this.apiCalls.push(apiCall);
    })
  }
}
