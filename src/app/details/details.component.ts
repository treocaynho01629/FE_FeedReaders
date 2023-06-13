import { Component, OnInit } from '@angular/core';
import {NewsapiService} from "../services/newsapi.service";
import {ActivatedRoute} from "@angular/router";
import {DetailArticle} from "../models/DetailArticle";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private service:NewsapiService, private activeRoute:ActivatedRoute, private title:Title) { }

  article: DetailArticle = new DetailArticle();
  currCate: string = "";
  currCateName: string | undefined;
  currPath: string = "";
  status = "loading";
  apiCall: any;
  ranCates: Map<string, string> = new Map<string, string>();

  ngOnInit() {
    this.activeRoute.params.subscribe(({ cate, path }) => {
      this.currCate = cate;
      this.currPath = path;

      const cates = new Map([...this.service.categories, ...this.service.medias]);
      this.ranCates = new Map([...cates].sort((a, b) => 0.5 - Math.random()).splice(0, 3));
      this.currCateName = cates.get(cate);
      this.loadArticle(cate, path)
    });
  }

  ngOnDestroy(){
    this.apiCall.unsubscribe();
  }

  public loadArticle(cate: string, path: string): void{
    this.status = "loading";
    this.apiCall && this.apiCall.unsubscribe();
    this.apiCall = this.service.getCurrArticle(cate, path)
      .subscribe((response) => {
        this.article = this.service.scrapArticle(response);
        this.status = "ok";

        //Set title
        this.title.setTitle('RING!-NEWS - ' + this.article.title);
        this.service.sleep(500);
      }, (error) => {
        console.error(error);
      })
  }
}
