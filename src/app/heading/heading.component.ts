import { Component, OnInit } from '@angular/core';
import { NewsapiservicesService } from '../services/newsapiservices.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor(private _service:NewsapiservicesService) { }

  //Mảng chưa bài viết
  headingDisplay:any = [];

  ngOnInit(): void {
    this._service.topHeading().subscribe((result)=>{ //Gán tin vào mảng
      console.log(result);
      this.headingDisplay = result.items;
    })
  }

}
