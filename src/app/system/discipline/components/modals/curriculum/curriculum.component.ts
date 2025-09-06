import {Component, ElementRef} from '@angular/core';
import {ModalService} from '../../../../../shared/services/modal.service';

@Component({
  selector: 'app-curriculum',
  standalone: false,
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss'
})
export class CurriculumComponent {
  constructor(
    private modalService: ModalService,
    private elementRef: ElementRef,
  ) {}

  onClose() {
    this.modalService.close(this.elementRef);
  }
}
