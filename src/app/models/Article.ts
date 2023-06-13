export class Article {
  private _title: string;
  private _content: string;
  private _cate: string;
  private _link: string;
  private _thumbnail: string;
  private _pubDate: any;
  constructor(title?: string, content?: string, cate?: string, link?: string, thumbnail?: string, pubDate?: any) {
    this._title = title ?? "";
    this._content = content ?? "";
    this._cate = cate ?? "";
    this._link = link ?? "";
    this._thumbnail = thumbnail ?? "";
    this._pubDate = pubDate ?? "";
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get cate(): string {
    return this._cate;
  }

  set cate(value: string) {
    this._cate = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }

  get thumbnail(): string {
    return this._thumbnail;
  }

  set thumbnail(value: string) {
    this._thumbnail = value;
  }

  get pubDate(): any {
    return this._pubDate;
  }

  set pubDate(value: any) {
    this._pubDate = value;
  }
}
