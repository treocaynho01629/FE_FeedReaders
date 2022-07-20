import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import {HeadingComponent} from "./heading/heading.component";
import {TechNewsComponent} from "./tech-news/tech-news.component";

const routes: Routes = [
  {path:'',component:HeadingComponent}, //hot
  {path:'tech',component:TechNewsComponent}, //tech
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
