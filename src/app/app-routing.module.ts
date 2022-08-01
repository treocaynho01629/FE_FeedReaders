import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HeadingComponent } from "./heading/heading.component";
import { CateNewsComponent } from "./cate-news/cate-news.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
  {path:'',component:HeadingComponent}, //Trang chủ
  {path:'category/:url',component:CateNewsComponent}, //Mục tin
  {path:'details',component:DetailsComponent}, //Chi tiết
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
