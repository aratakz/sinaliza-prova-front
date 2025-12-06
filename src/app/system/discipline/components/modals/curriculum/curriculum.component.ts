import {Component, ElementRef, OnInit} from '@angular/core';
import {ModalService} from '../../../../../shared/services/modal.service';
import {CurriculumService} from '../../../../services/curriculum.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-curriculum',
  standalone: false,
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss'
})
export class CurriculumComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalService: ModalService,
    private elementRef: ElementRef,
    private curriculumService: CurriculumService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      weight : ['', Validators.required],
    });
  }

  onClose() {
    this.modalService.close(this.elementRef);
  }
  async onSubmit() {
    if (this.form.invalid) {
      await this.alertService.toastError('Informe todos os campos do formulário.');
    } else {
      if (isNaN(this.form.value.weight)) {
        await this.alertService.toastError('O campo peso deve ser um número');
      } else {
        this.curriculumService.curriculumBehavior.next([{
          name: this.form.value.name,
          weight: this.form.value.weight,
        }]);
      }
      this.onClose();
    }
  }
}
