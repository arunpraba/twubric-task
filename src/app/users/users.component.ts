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
      id: 1,
      menu: 'Twubric Score'
    },
    {
      id: 2,
      menu: 'Friends'
    },
    {
      id: 3,
      menu: 'Influence'
    },
    {
      id: 4,
      menu: 'Chirpiness'
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

  sortBy(id) {
    this.isSortActive = false;
    this.isFilterActive = false;
    if (id === 1) {
      this.apiData = this.apiData.sort(
        (a, b) => b.twubric.total - a.twubric.total
      );
    } else if (id === 2) {
      this.apiData = this.apiData.sort(
        (a, b) => b.twubric.friends - a.twubric.friends
      );
    } else if (id === 3) {
      this.apiData = this.apiData.sort(
        (a, b) => b.twubric.influence - a.twubric.influence
      );
    } else if (id === 4) {
      this.apiData = this.apiData.sort(
        (a, b) => b.twubric.chirpiness - a.twubric.chirpiness
      );
    }
  }

  removeItem(user) {
    this.apiData = this.apiData.filter(el => el.uid !== user.uid);
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
