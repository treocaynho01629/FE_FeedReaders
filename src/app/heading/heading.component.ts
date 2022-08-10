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

  headingNews:any = []; //Mảng chứa bài viết
  status = "loading";

  ngOnInit() {

    this.service.getNewsFeed("tin-moi-nhat.rss").subscribe((result)=>{
      this.headingNews = this.service.snippetContent(result).items; //Tỉa content + gán mảng
      this.status = result.status;
      sessionStorage.removeItem('details'); //xoá bài viết đang xem khi về trang chủ
    })
  }

  viewDetails(article: any){ //Xem chi tiết bài
    this.service.setCurrArticle(article); //gán bài lên session
    this.router.navigate(['/details']); //chuyển trang details
  }
}
