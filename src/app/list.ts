import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

export class lists implements OnInit {
    completed: boolean;
    todos: any;
    newList: any;
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, ) {

    }
    ngOnInit() {
        this.storage.get("lists");
    }

}
