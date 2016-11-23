import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {EdgeService} from './edge-service';
import {Vertex} from './vertex';
import {Graph} from './graph';
import {Edge} from './edge';
import {AppComponent} from './app.components'
import {InnerChild} from './inner_child.component'
@NgModule({
  imports:      [ BrowserModule ,FormsModule],
  declarations: [ AppComponent,Vertex,Graph,Edge,InnerChild],
  bootstrap:    [ AppComponent ],
  providers:    [EdgeService],
  entryComponents:[Edge]
})
export class AppModule { }
/*
* 导入了表单模块：FormsModule
* */