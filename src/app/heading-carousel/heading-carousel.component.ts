import {Component, Input, SimpleChanges} from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';
import {Feeds} from "../models/Feeds";
import {NewsapiService} from "../services/newsapi.service";

@Component({
  selector: 'app-heading-carousel',
  templateUrl: './heading-carousel.component.html',
  styleUrls: ['./heading-carousel.component.scss']
})
export class HeadingCarouselComponent {

  curr: number = 0;
  amount: number = 0;
  @Input() categories: Map<string, string> = new Map<string, string>();
  feeds: Feeds = new Feeds();
  apiCall: any;

  constructor(private service:NewsapiService, public breakpointObserver: BreakpointObserver) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadFeeds();
    this.breakpointObserver.observe('(max-width: 576px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) { this.amount = 1 } else { this.amount = 2; this.prev() }
      })
    this.breakpointObserver.observe('(max-width: 768px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) { this.amount = 2 } else { this.amount = 3; this.prev() }
      })
    this.breakpointObserver.observe('(max-width: 992px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) { this.amount = 3 } else { this.amount = 4; this.prev() }
      })
    this.curr = 0;
  }

  next(){
    if (this.curr >= (this.feeds.feeds.length - this.amount)){
      this.curr = 0;
    } else {
      this.curr += 1;
    }
  }

  prev(){
    if (this.curr <= 0){
      this.curr = (this.feeds.feeds.length - this.amount);
    } else {
      this.curr -= 1;
    }
  }

  loadFeeds(){
    this.feeds.status = "loading";
    this.apiCall && this.apiCall.unsubscribe();
    this.apiCall = this.service.getNewsFeed(this.categories.keys().next().value)
      .subscribe((response) => {
        this.feeds = this.service.scrapFeeds(response);
      }, (error) => {
        console.error(error);
      })
  }

  returnZero() {
    return 0
  }

}
