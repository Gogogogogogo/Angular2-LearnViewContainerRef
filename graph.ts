import {
    Component, ComponentFactoryResolver, ViewChild, OnInit, Input, Class, ElementRef,
    ViewChildren, ViewContainerRef
} from '@angular/core';
import {EdgeService} from './edge-service';
import {InnerChild} from './inner_child.component'
import {Vertex} from'./vertex'
@Component({
    moduleId:module.id,
    selector: 'graph',
    template: `<div>
    <h1>Create a Graph</h1>

    <div #container class="alert alert-info" role="alert">
        Click any pair of nodes to connect them with an edge
    </div>

    <vertex [value]="'A'"></vertex>

    <table class="graph-table">
        <tr>
            <td><vertex [value]="'B'"></vertex><td><vertex [value]="'C'" ></vertex></td>
        <tr>
            <td><vertex [value]="'E'" ></vertex></td><td><vertex [value]="'F'" ></vertex></td>
        </tr>
        <tr>
            <td><vertex [value]="'G'" ></vertex></td><td><vertex [value]="'H'" ></vertex></td><td><vertex [value]="'I'" ></vertex></td>
        </tr>
    </table>
    <inner-child *ngIf="needchild"></inner-child>
</div>
<template #template let-description="description">
    <h2>My {{description}} template</h2>
    <button>My {{description}} button</button>
</template>
<h4><a href="http://www.syntaxsuccess.com/viewarticle/loading-components-dynamically-in-angular-2.0">Read more here</a></h4>
`,
    providers:[EdgeService]
})

export class Graph implements OnInit {
    needchild:boolean=true;
    @Input() edge:any;
    @ViewChild(InnerChild) innerChild:any;
    @ViewChild('container',{read:ViewContainerRef}) child:ViewContainerRef;
    @ViewChildren(Vertex) children:ElementRef;
    @ViewChild('template') mtp:any;
    constructor(private componentResolver: ComponentFactoryResolver, private edgeService:EdgeService,private viewcontainerRef:ViewContainerRef){}

    ngOnInit(){
        this.edgeService.getCoordinates().subscribe(coordinates => {
            let factory = this.componentResolver.resolveComponentFactory(this.edge);
            let res = coordinates.first.viewContainer.createComponent(factory);
            this.innerChild.vc.createComponent(factory);
            this.viewcontainerRef.createEmbeddedView(this.mtp, {description: 'sweet'});
            res.instance.setCoordinates(coordinates.first, coordinates.second);
            this.child.createEmbeddedView(this.mtp, {description: 'sweet'});
            this.child.createComponent(factory);
            console.log(this.viewcontainerRef===this.child)//false;
            console.log(this.edge);
            console.log(this.child);
            console.log(this.children);
        });
    }
}
/**
    * Instantiates a single {@link Component} and inserts its Host View into this container at the
    * specified `index`.
    *
    * The component is instantiated using its {@link ComponentFactory} which can be
    * obtained via {@link ComponentFactoryResolver#resolveComponentFactory}.
    *
    * If `index` is not specified, the new View will be inserted as the last View in the container.
    *
    * You can optionally specify the {@link Injector} that will be used as parent for the Component.
    *
    * Returns the {@link ComponentRef} of the Host View created for the newly instantiated Component.
    */
  //  abstract createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][]): ComponentRef<C>;


/**
 * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
 * into this container at the specified `index`.
 *
 * If `index` is not specified, the new View will be inserted as the last View in the container.
 *
 * Returns the {@link ViewRef} for the newly created View.
 */
// abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
/*
If you inject ViewContainerRef the element is the host element of TestDirective.
If you use @ViewChild(templateVarNameOrType) or @ContentChild(templateVarNameOrType)
it's the element where templateVarNameOrType matches.

You should be aware that this.viewContainer.createEmbeddedView() or this.viewContainer.createComponent()
creates the element or component as sibling of the element ViewContainerRef points to, not as many expect as child.*/
