import { Component, OnInit } from '@angular/core';
import { WebService } from '../service/web.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  apiData: any;
  usersList: any;
  isSortActive: boolean = false;
  isFilterActive: boolean = false;
  filter = {
    fromDate: new Date(),
    toDate: new Date()
  };
  

  sortMenuList = [
    {
      menu: 'Twubric Score',
      name: 'total'
    },
    {
      menu: 'Friends',
      name: 'friends'
    },
    {
      menu: 'Influence',
      name: 'influence'
    },
    {
      menu: 'Chirpiness',
      name: 'chirpiness'
    }
  ];

  constructor(private web: WebService) {}

  ngOnInit() {
    this.web.getData().subscribe(
      data => {
        this.usersList = data;
        this.apiData = this.usersList;
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleDropdown() {
    this.isSortActive = !this.isSortActive;
  }

  toggleFilterDropdown() {
    this.isFilterActive = !this.isFilterActive;
  }

  sortBy(type, name) {
    this.isSortActive = false;
    this.isFilterActive = false;
    if(type === 'ab') {
      this.apiData = this.apiData.sort(
        (a, b) => a.twubric[name] - b.twubric[name]
      );
    } else if(type === 'ba') {
      this.apiData = this.apiData.sort(
        (a, b) => b.twubric[name] - a.twubric[name]
      ); 
    }
  }

  removeItem(user) {
    this.apiData = this.apiData.filter(el => el.uid !== user.uid);
    const index =  this.usersList.findIndex(el=> el.uid===user.uid)
    this.usersList.splice(index, 1)
  }

  filterByDate() {
    this.isSortActive = false;
    this.isFilterActive = false;
    const fromDate = new Date(this.filter.fromDate);
    const fM = fromDate.getTime();
    const toDate = new Date(this.filter.toDate);
    const tM = toDate.getTime();
    const res = this.usersList;
    this.apiData = res.filter(
      el => tM > el.join_date * 1000 && el.join_date * 1000 > fM
    );
  }
}
