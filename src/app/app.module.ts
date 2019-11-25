import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListsComponent } from './lists/lists.component';
import { TodayComponent } from './today/today.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { NewlistsComponent } from './newlists/newlists.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { TaskComponent } from './task/task.component';
import { NgxClickToEditModule } from 'ngx-click-to-edit';
import { PopoverModule } from "ngx-popover";
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListsComponent,
    TodayComponent,
    ScheduledComponent,
    NewlistsComponent,
    TaskComponent
  ],
  imports: [
    NgxMyDatePickerModule.forRoot(),
    BrowserModule,
    StorageServiceModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxClickToEditModule.forRoot(),
    PopoverModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    DpDatePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
