import { Component, OnInit, AfterViewInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { lists } from '../list'
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
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
      date: 'Today'
    }
    this.result = []
    this.completed = [];
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.checkbox:checked').each(function () {
        $(this).parent().parent().hide();
      });
    });

    this.lists = this.storage.get("lists");
    this.parent = this.lists

    var aa = this.storage.get("task");
    var result2 = aa.filter(obj => {
      return obj !== "" && obj !== null
    })
    this.tasks = result2;
    this.storage.set("task", this.tasks);
    console.log(result2)
    this.count = 0;


    let count = this.tasks.filter(obj => {
      return obj.completed == true
    })
    console.log(count.length)
    this.count = count.length
    // this.tasks = result

    $(".show").click(function () {
      // $("li").show();
      console.log($('.checkbox:checked').is(':visible'))

      $('.checkbox:checked').each(function () {
        $(this).parent().parent().toggle();
      });
    });
    for (let i of this.tasks) {
      this.border = i.notes.Priority
      this.result.push(this.border)
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

  }
  changed() {

    this.count = 0;
    this.tasks.forEach(item => {
      if (item.completed) {
        this.count = this.count + 1
      }
    })
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
  onChange(index) {
    console.log(index);
    this.index = index
  }
  addTodo(event) {
    console.log(this.index)
    this.todoObj = {
      newTodo: this.newTodo,
      notes: this.notes,
      completed: false
    }
    this.tasks.push(this.todoObj)
    this.lists[this.index].todos.push(this.todoObj)
    this.storage.set("lists", this.lists);
    this.storage.set("task", this.tasks);
    this.newTodo = '';
    event.preventDefault();
  }
  toggleAccordian(event, index) {
    var lists = this.storage.get("lists");
    console.log(lists)
    if (this.tasks[index].notes.note) {
      $('#note' + index).val(this.tasks[index].notes.note);
      console.log(index)

    } else {
      $('#note' + index).val('');
    }
    if (this.tasks[index].notes.date) {
      this.date = this.tasks[index].notes.date;
    } else {
      this.date = '';
    }
    if (this.tasks[index].notes.Priority) {
      $('#priority' + index).val(this.tasks[index].notes.Priority);

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
    this.setalltodo();
  }
  values = '';
  onKey(event: any, i) {
    this.values = event.target.value;
    this.note = this.values;
    this.tasks[i].notes.note = this.values;
    this.storage.set("task", this.tasks);
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    console.log(this.lists[count].todos[parent])
    this.lists[count].todos[parent].notes.note = this.note
    // this.lists[this.index].todos[i].notes.note = this.values
    this.storage.set("lists", this.lists)
    this.setalltodo();

  }
  values2 = '';

  editTodo(event: any, i) {
    this.values2 = event.target.textContent;
    this.newTodo = this.values2;
    this.tasks[i].newTodo = this.values2;
    this.storage.set("task", this.tasks);
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    this.lists[count].todos[parent].newTodo = this.values2
    this.storage.set("lists", this.lists)
    this.setalltodo();

  }

  savePriority(event: any, i) {
    let priority;
    priority = this.tasks[i].notes.Priority = this.Priority;
    this.storage.set("task", this.tasks);
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    this.lists[count].todos[parent].notes.Priority = this.Priority
    this.storage.set("lists", this.lists)
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

  }

  savedate(event: any, i) {
    this.tasks[i].notes.date = this.date
    this.storage.set("task", this.tasks);
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    this.lists[count].todos[parent].notes.date = this.date
    this.storage.set("lists", this.lists)
    this.setalltodo();

  }
  deleteTodo(index) {
    this.count--;
    this.tasks.notes = ''
    this.tasks.splice(index, 1);
    this.storage.set("task", this.tasks);
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[index].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[index].newTodo
    })
    this.lists[count].todos.splice(parent, 1);
    this.storage.set("lists", this.lists)
    this.setalltodo();

  }

  deleteSelectedTodos() {
    for (var i = (this.tasks.length - 1); i > -1; i--) {
      if (this.tasks[i].completed) {
        this.count--;
        this.tasks.notes = ''
        this.tasks.splice(i, 1);
        this.storage.set("lists", this.lists)
        this.storage.set("task", this.tasks);
      }
    }
  }
  setinputEdit(index) {
    this.tasks.forEach(t => t.canEdit = false)
    this.tasks[index].canEdit = true
  }

}
