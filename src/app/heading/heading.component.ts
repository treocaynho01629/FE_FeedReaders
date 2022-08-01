import { Component, OnInit } from '@angular/core';
import { NewsParseAPIService } from '../services/newsparseapi.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor(private service:NewsParseAPIService, private router:Router) { }

  //Mảng chứa bài viết
  headingNews:any = [];
  status = "loading";

  ngOnInit() {

    this.service.getNewsFeed("tin-moi-nhat.rss").subscribe((result)=>{
      this.headingNews = this.service.snippetContent(result).items; //Tỉa content + gán mảng
      this.status = result.status;
    })
  }

  viewDetails(article: any){ //Xem chi tiết bài
    this.service.currArticles = article;
    this.router.navigate(['/details']);
  }
}
