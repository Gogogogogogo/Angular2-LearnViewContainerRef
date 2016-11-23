import { Component} from '@angular/core';
import {Edge} from './edge'
@Component({
  selector: 'my-app',
  template: `
  			<graph [edge]="medge"></graph>
  			`
})
export class AppComponent {
	 medge=Edge;
 }
/*
* 模板中：插值表达式：{{title}}
* 		 双向绑定： [(ngModel)]
* */