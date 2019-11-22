import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { lists } from '../list'
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {


  newTodo: string;
  todos: any;
  todoObj: any;
  newList: string;
  listid: number;
  lists: lists[];
  listObj: any;
  count: number;
  parent: any;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, ) {
    this.newTodo = '';
    this.todos = [];
    this.newList = '';
    this.listid;
    this.lists = [];
    // this.count = 0;
  }
  ngOnInit() {
    if (this.storage.get("lists")) {
      this.lists = this.storage.get("lists");
    }
  }

  addlist(event) {
    // this.count++;
    this.listObj = {
      newList: this.newList,
      listid: this.count,
      todos: this.todos,
      completed: false
    }
    this.lists.push(this.listObj);
    this.newList = '';
    event.preventDefault();
    this.storage.set("lists", this.lists)

  }

  deletelist(index) {
    this.lists.splice(index, 1);
    this.storage.set("lists", this.lists)
    console.log(index)
  }

  deleteSelectedlists() {
    for (var i = (this.lists.length - 1); i > -1; i--) {
      if (this.lists[i].completed) {
        this.lists.splice(i, 1);
        this.storage.set("lists", this.lists)
      }
    }
  }

}
