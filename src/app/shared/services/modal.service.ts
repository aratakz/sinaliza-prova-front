import {Component, ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>, component: any) {
    const modalComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes
    ]);
    modalComponent.hostView.detectChanges();
    this.document.body.prepend(modalComponent.location.nativeElement);
  }

  close(templateRef: TemplateRef<any>) {

  }
}
