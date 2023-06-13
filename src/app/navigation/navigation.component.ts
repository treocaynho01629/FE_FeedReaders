import { Component, OnInit } from '@angular/core';
import { NewsapiService } from "../services/newsapi.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private service:NewsapiService) { }

  categories: Map<string, string> = new Map<string, string>();
  medias: Map<string, string> = new Map<string, string>();

  ngOnInit(): void {
    this.categories = this.service.categories;
    this.medias = this.service.medias;
  }

  returnZero() {
    return 0
  }
}
