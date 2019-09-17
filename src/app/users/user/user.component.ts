import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user;
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  headers: any[];

  constructor() {}

  ngOnInit() {
    this.headers = Object.keys(this.user.twubric);
  }

  getDate(date) {
    return new Date(date * 1000);
  }

  deleteItem(user) {
    this.removeItem.emit(user);
  }
}
