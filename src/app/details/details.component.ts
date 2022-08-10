import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  article: any; //bài đang xem
  status = "loading";

  ngOnInit() {
    const curr = sessionStorage.getItem('details'); //lấy bài đang xem từ session
    if (curr){
      this.article = JSON.parse(curr);
      this.status = "ok";
    }
  }
}
