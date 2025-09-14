import {
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef
} from '@angular/core';
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

  open(content: TemplateRef<any>, component: any, inputs: Array<Object> = []): void {
    const modalComponentFactory =
    this.componentFactoryResolver.resolveComponentFactory(component);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes
    ]);

    if (inputs.length) {
      for (const input of inputs) {
        for (const key of Object.keys(input)) {
          modalComponent.setInput(key, inputs[inputs.indexOf(input)]);
        }
      }
    }
    modalComponent.hostView.detectChanges();
    this.document.body.prepend(modalComponent.location.nativeElement);
  }

  close(templateRef: ElementRef) {
      templateRef.nativeElement.remove();
  }
}
