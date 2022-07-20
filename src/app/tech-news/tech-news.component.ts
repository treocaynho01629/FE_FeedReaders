import { Component, OnInit } from '@angular/core';
import { NewsapiservicesService } from '../services/newsapiservices.service';

@Component({
  selector: 'app-tech-news',
  templateUrl: './tech-news.component.html',
  styleUrls: ['./tech-news.component.scss']
})
export class TechNewsComponent implements OnInit {

  constructor(private _services:NewsapiservicesService) { }

  techNewsDisplay:any = []; //Mảng chứa tin từ api

  ngOnInit(): void {

    this._services.techNews().subscribe((result)=>{ //Gán bài viết vào mảng
      this.techNewsDisplay = result.items;
    })
  }

}
