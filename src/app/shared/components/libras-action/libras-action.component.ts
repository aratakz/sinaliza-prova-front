import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {RecordOptionsModalComponent} from '../modals/record-options-modal/record-options-modal.component';

@Component({
  selector: 'app-libras-action',
  standalone: false,
  templateUrl: './libras-action.component.html',
  styleUrl: './libras-action.component.scss'
})
export class LibrasActionComponent implements OnInit {
  @Input({required: true}) type: string|undefined;
  @Input({required: true}) fieldId: string|undefined;

  @Output() onVideoAprove: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
  }

  displayModal(templateRef: TemplateRef<any>): void {
    this.modalService.open(templateRef, RecordOptionsModalComponent, [{
        type: this.type,
        fieldId: this.fieldId
      }
    ]);

    this.modalService.onAprove.subscribe((videoId: string) => {
      this.onVideoAprove.emit(videoId);
    });
  }


}
