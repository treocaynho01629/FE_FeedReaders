import {Feeds} from "./Feeds";

export class DetailArticle {
  private _title: string;
  private _cate: string;
  private _pubDate: any;
  private _fullContent: string;
  private _author: string;
  private _related: Feeds;
  constructor(title?: string, cate?: string, pubDate?: any, fullContent?: string, author?: string, related?: Feeds) {
    this._title = title ?? "";
    this._cate = cate ?? "";
    this._pubDate = pubDate ?? "";
    this._fullContent = fullContent ?? "";
    this._author = author ?? "";
    this._related = related ?? new Feeds();
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get cate(): string {
    return this._cate;
  }

  set cate(value: string) {
    this._cate = value;
  }

  get pubDate(): any {
    return this._pubDate;
  }

  set pubDate(value: any) {
    this._pubDate = value;
  }

  get fullContent(): string {
    return this._fullContent;
  }

  set fullContent(value: string) {
    this._fullContent = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get related(): Feeds {
    return this._related;
  }

  set related(value: Feeds) {
    this._related = value;
  }
}
