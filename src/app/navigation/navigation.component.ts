import { Component, OnInit } from '@angular/core';
import {NewsParseAPIService} from "../services/newsparseapi.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private service:NewsParseAPIService, private router:Router) { }

  categories: any; //danh sách các mục báo

  ngOnInit(): void {
    this.categories = this.service.categories; //lấy danh sách từ services
  }

  //chuyển tab category
  viewCate(category:any){
    this.router.navigateByUrl('/category/', {skipLocationChange: true}).then(()=>
    {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false; //reload router
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate( ['/category/' + category.url])
    });
  }
}
