/**
 * Created by 10206545 on 2016/11/23.
 */
import {Component, ViewContainerRef} from '@angular/core';
@Component({
    selector: 'inner-child',
    template: ``
})
export class InnerChild {
    constructor(private vc: ViewContainerRef){}
}