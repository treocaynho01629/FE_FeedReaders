import {Article} from "./Article";

export class Feeds {
  private _feeds: Article[];
  private _cateName: string;
  private _status: string;
  constructor(feeds?: Article[], cateName?: string, status?: string) {
    this._feeds = feeds ?? [];
    this._cateName = cateName ?? "";
    this._status = status ?? "loading";
  }

  get feeds(): Article[] {
    return this._feeds;
  }

  set feeds(value: Article[]) {
    this._feeds = value;
  }

  get cateName(): string {
    return this._cateName;
  }

  set cateName(value: string) {
    this._cateName = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
