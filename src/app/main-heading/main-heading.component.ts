import {Component, Input} from '@angular/core';
import { Feeds } from "../models/Feeds";

@Component({
  selector: 'app-main-heading',
  templateUrl: './main-heading.component.html',
  styleUrls: ['./main-heading.component.scss']
})
export class MainHeadingComponent {

  @Input() feeds: Feeds = new Feeds();

  constructor() {
  }

}
