import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  notifier: Subject<string>;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>, component: any, inputs: Array<Object> = []): this {
    const modalComponentFactory =
    this.componentFactoryResolver.resolveComponentFactory(component);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes
    ]) as any;

    if (inputs.length) {
      for (const input of inputs) {
        for (const key of Object.keys(input)) {
          modalComponent.setInput(key, inputs[inputs.indexOf(input)]);
        }
      }
    }

    if (modalComponent.instance.submit) {
      modalComponent.instance.submit.subscribe((modalData: string) => {
        this.notifier.next(modalData);
      });
    }
    modalComponent.hostView.detectChanges();
    this.document.body.prepend(modalComponent.location.nativeElement);
    this.notifier = new Subject<string>();
    return this;
  }

  close(templateRef: ElementRef) {
      templateRef.nativeElement.remove();
      this.notifier.complete();
  }

  get onAprove(): Observable<string> {
    return this.notifier.asObservable();
  }




}
