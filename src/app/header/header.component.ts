import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  showHeader: boolean = true;

  ngOnInit() {
    this.router.events.subscribe(event => this.modifyHeader(event));

  }
  alert() {
    alert('New')
  }

  newList: string;
  lists: any;
  listObj: any;

  constructor(private router: Router) {
    this.newList = '';
    this.lists = [];
  }

  addlist(event) {
    this.listObj = {
      newList: this.newList,
      completed: false
    }
    this.lists.push(this.listObj);
    this.newList = '';
    event.preventDefault();
  }

  deletelist(index) {
    this.lists.splice(index, 1);
  }

  deleteSelectedlists() {
    for (var i = (this.lists.length - 1); i > -1; i--) {
      if (this.lists[i].completed) {
        this.lists.splice(i, 1);
      }
    }
  }

  modifyHeader(location) {
    if (location.url != "/lists") {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
}
