import { Component, OnInit, AfterViewInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { lists } from '../list'
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {
  @Input() lists: lists[];

  notes: any;
  index: any;
  newTodo: string;
  tasks: any;
  todoObj: any;
  note: any;
  date: any;
  Priority: any;
  canEdit: boolean
  border: any;
  result: any;
  completed: any;
  count: number;
  parent: any;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.newTodo = '';
    this.tasks = [];
    this.notes = {
      note: this.note,
      Priority: this.Priority,
      date: this.date
    }
    this.result = []
    this.completed = [];
    this.parent;
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.checkbox:checked').each(function () {
        $(this).parent().parent().hide();
      });
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.index = params.get('index');
    })
    this.lists = this.storage.get("lists");
    this.tasks = this.lists[this.index].todos;
    this.count = 0;
    let arr = this.lists[this.index].todos;
    this.parent = this.lists[this.index].newList

    let count = arr.filter(obj => {
      return obj.completed == true
    })
    console.log(count.length)
    this.count = count.length
    $(".show").click(function () {

      $('.checkbox:checked').each(function () {

        $(this).parent().parent().toggle();

      });
    });
    for (let h of this.tasks) {
      this.border = h.notes.Priority
      this.result.push(this.border)
    }

  }
  setodo() {
    var array = [];
    var task = [];

    for (var k = 0; k <= this.lists.length; k++) {
      array = this.lists[k].todos;
      var result2 = array.filter(obj => {
        return obj.notes.date == "Today"
      })

      for (var l = 0; l <= result2.length; l++) {
        if (result2[l] !== "" && result2[l] !== null) {
          task.push(result2[l]);
        }
      }
      // console.log(task)

      this.storage.set("task", task);
    }


  }
  setalltodo() {

    var array2 = [];
    var task = [];
    for (var m = 0; m <= this.lists.length; m++) {
      array2 = this.lists[m].todos;
      for (var n = 0; n <= array2.length; n++) {
        if (array2[n] !== "" && array2[n] !== null) {
          task.push(array2[n]);
        }
      }
      console.log(task)
      this.storage.set("all", task);
    }


  }
  ngAfterViewInit() {


    for (var i = 0; i <= this.result.length; i++) {
      if (this.result[i] == 'high') {
        $('li')[i].style.borderLeft = "solid red"
      }
      if (this.result[i] == 'low') {
        $('li')[i].style.borderLeft = "solid blue"
      }
      if (this.result[i] == 'medium') {
        $('li')[i].style.borderLeft = "solid orange"
      }
      if (this.result[i] == 'none') {
        $('li')[i].style.borderLeft = "none"
      }
    }

    var lists = this.lists;
    var tasks = this.tasks;
    var set = this.storage;
    var completed = this.completed;
    var count = this.count;

    let arr = this.lists[this.index].todos;

    $(".checkbox").change(function (i) {

      if ($(this).is(":checked")) {

        let index = $(this).parent().parent().index();
        set.set("lists", lists);
        $(this).parent().parent().hide();
        completed.length = 0;
        completed.push(tasks)
        // console.log(completed)
        set.set("completed", completed);
        count++;

      } else {
        $(this).parent().parent().show();
        set.set("lists", lists);
        completed.length = 0;
        completed.push(tasks)
        set.set("completed", completed);
        count--;
      }
    });
    this.setalltodo();
    this.setodo();

  }
  changed() {

    this.count = 0;
    this.tasks.forEach(item => {
      if (item.completed) {
        this.count = this.count + 1
      }
    })
    this.setalltodo()
    this.setodo()
  }
  // valueChanged(index) {
  //   var div = $('.checkbox')
  //   for (var i = 0; i <= div.length; i++) {
  //     if ($(this).is(":checked")) {
  //       $(this).parent().parent().toggle();
  //     }
  //   }

  // }


  addTodo(event) {
    const todoObj = {
      newTodo: this.newTodo,
      notes: this.notes,
      parent: this.parent,
      completed: false
    }
    this.lists[this.index].todos.push(todoObj)
    this.storage.set("lists", this.lists)

    this.newTodo = '';
    event.preventDefault();
    console.log(this.tasks)
    this.setodo();

  }
  toggleAccordian(event, index) {

    var lists = this.storage.get("lists");
    var tasks = lists[this.index].todos;

    if (tasks[index].notes.note) {
      $('#note' + index).val(tasks[index].notes.note);
      console.log(index)

    } else {
      $('#note' + index).val('');
    }
    if (tasks[index].notes.date) {
      this.date = tasks[index].notes.date;
    } else {
      this.date = '';
    }
    if (tasks[index].notes.Priority) {
      $('#priority' + index).val(tasks[index].notes.Priority);

    } else {
      $('#priority' + index).val('');
    }

    var element = event.target;
    element.classList.toggle("active");
    if (this.tasks[index].isActive) {
      this.tasks[index].isActive = false;
    } else {
      this.tasks[index].isActive = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    this.setodo();
  }
  values = '';
  onKey(event: any, i) {
    this.values = event.target.value;
    this.note = this.values;
    this.lists[this.index].todos[i].notes.note = this.values
    this.storage.set("lists", this.lists);
    this.setalltodo();
    this.setodo();
  }
  values2 = '';

  editTodo(event: any, i) {
    this.values2 = event.target.textContent;
    this.lists[this.index].todos[i].newTodo = this.values2
    this.storage.set("lists", this.lists)
    this.setalltodo();
    this.setodo();
  }

  savePriority(event: any, i) {
    let priority;
    priority = this.lists[this.index].todos[i].notes.Priority = this.Priority
    this.storage.set("lists", this.lists);
    if (priority == 'high') {
      $('li')[i].style.borderLeft = "solid red"
    }
    if (priority == 'low') {
      $('li')[i].style.borderLeft = "solid blue"
    }
    if (priority == 'medium') {
      $('li')[i].style.borderLeft = "solid orange"
    }
    if (priority == 'none') {
      $('li')[i].style.borderLeft = "none"
    }
    this.setalltodo();
    this.setodo();

  }
  savedate(event: any, i) {
    this.lists[this.index].todos[i].notes.date = this.date
    this.storage.set("lists", this.lists)
    this.setalltodo();
    this.setodo()
  }
  deleteTodo(index) {
    this.count--;
    this.tasks.notes = ''
    this.tasks.splice(index, 1);
    this.storage.set("lists", this.lists)
    this.setalltodo();
    this.setodo();
  }

  deleteSelectedTodos() {
    for (var i = (this.tasks.length - 1); i > -1; i--) {
      if (this.tasks[i].completed) {
        this.count--;
        this.tasks.notes = ''
        this.tasks.splice(i, 1);
        this.storage.set("lists", this.lists)
      }
    }
    this.setalltodo();
    this.setodo();
  }
  setinputEdit(index) {
    this.tasks.forEach(t => t.canEdit = false)
    this.tasks[index].canEdit = true
    this.setalltodo();
    this.setodo();
  }

}
