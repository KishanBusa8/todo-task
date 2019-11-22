import { Component, OnInit, AfterViewInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { lists } from '../list'
import 'rxjs/add/operator/switchMap';
import * as $ from 'jquery';
@Component({
  selector: 'app-today',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
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
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.checkbox:checked').each(function () {
        $(this).parent().parent().hide();
      });
    });

    this.lists = this.storage.get("lists");
    // this.parent = this.lists

    var aa = this.storage.get("all");
    var result2 = aa.filter(obj => {
      return obj !== "" && obj !== null
    })
    this.tasks = result2;
    this.storage.set("all", this.tasks);

    // console.log(result2)
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
  changed() {

    this.count = 0;
    this.tasks.forEach(item => {
      if (item.completed) {
        this.count = this.count + 1
      }
    })
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
    this.storage.set("all", this.tasks);
    this.newTodo = '';
    event.preventDefault();
  }

  toggleAccordian(event, index) {

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
    this.setodo();
  }
  values = '';
  onKey(event: any, i) {
    this.values = event.target.value;
    this.note = this.values;
    this.tasks[i].notes.note = this.values;
    this.storage.set("all", this.tasks);
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
    this.setodo();

  }
  values2 = '';

  editTodo(event: any, i) {
    this.values2 = event.target.textContent;
    this.newTodo = this.values2;
    this.tasks[i].newTodo = this.values2;
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    this.lists[count].todos[parent].newTodo = this.values2
    this.storage.set("lists", this.lists)

    this.storage.set("all", this.tasks);
    this.setodo();

  }

  savePriority(event: any, i) {
    let priority;
    priority = this.tasks[i].notes.Priority = this.Priority;
    this.storage.set("all", this.tasks);
    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    this.lists[count].todos[parent].notes.Priority = this.Priority
    this.storage.set("lists", this.lists)
    this.storage.set("all", this.tasks);
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
    this.setodo();

  }

  savedate(event: any, i) {
    this.tasks[i].notes.date = this.date

    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[i].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[i].newTodo
    })
    this.lists[count].todos[parent].notes.date = this.date
    this.storage.set("lists", this.lists)

    this.storage.set("all", this.tasks);
    this.setodo();

  }
  deleteTodo(index) {
    this.count--;
    this.tasks.notes = ''
    this.tasks.splice(index, 1);
    this.storage.set("all", this.tasks);

    let count = this.lists.findIndex(obj => {
      return obj.newList == this.tasks[index].parent
    })

    let parent = this.lists[count].todos.findIndex(obj => {
      return obj.newTodo == this.tasks[index].newTodo
    })
    this.lists[count].todos.splice(parent, 1);
    this.storage.set("lists", this.lists)
    this.setodo();

  }

  deleteSelectedTodos() {
    for (var i = (this.tasks.length - 1); i > -1; i--) {
      if (this.tasks[i].completed) {
        this.count--;
        this.tasks.notes = ''
        this.tasks.splice(i, 1);
        this.storage.set("lists", this.lists)
        this.storage.set("all", this.tasks);
      }
    }
    this.setodo();

  }
  setinputEdit(index) {
    this.tasks.forEach(t => t.canEdit = false)
    this.tasks[index].canEdit = true
  }

}
