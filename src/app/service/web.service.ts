import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const endPoint =
  'https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/9667fc19a0f89193e894da7aaadf6a4b7758b45e/twubric.json';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(endPoint);
  }
}
