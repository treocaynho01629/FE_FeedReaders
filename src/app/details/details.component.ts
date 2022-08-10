import { Component, OnInit } from '@angular/core';
import { NewsParseAPIService } from '../services/newsparseapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private service:NewsParseAPIService) { }

  article: any; //bài đang xem
  status = "loading";

  ngOnInit() {
    const curr = this.service.currArticles;
    if (curr){
      this.article = curr;
      this.status = "ok";
    }
  }

}
