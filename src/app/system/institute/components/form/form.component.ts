import { Component } from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstituteService} from '../../../../shared/services/institute.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form: FormGroup;

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private instituteService: InstituteService,
    private alertService: AlertService,
    private router: Router,
  ) {
    globalService.actionControlBehavior.next(false);
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.instituteService.register(this.form.value).subscribe({
      next: async response => {
        await this.alertService.toastSuccess('Cadastro realizado com sucesso!');
        await this.router.navigate(['../system/institute/list']);
      }
    })
  }
}
