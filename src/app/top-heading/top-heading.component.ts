import { Component, Input } from '@angular/core';
import { Feeds } from "../models/Feeds";

@Component({
  selector: 'app-top-heading',
  templateUrl: './top-heading.component.html',
  styleUrls: ['./top-heading.component.scss']
})
export class TopHeadingComponent {

  @Input() feeds: Feeds = new Feeds();

  constructor() {
  }

}
