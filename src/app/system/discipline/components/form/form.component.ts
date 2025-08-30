import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {DisciplineService} from '../../../services/discipline.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../shared/services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;

  constructor(
    private globalService: GlobalService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
    });

    this.globalService.activeRouteBehavior.next('Nova disciplina');
  }

  onSubmit() {
    this.disciplineService.register(this.form.value).subscribe({
      next: async () => {
        await this.alertService.toastSuccess('Disciplina cadastrada com êxito.');
        await this.router.navigate(['../system/discipline/list']);
      },
      error: async () => {
        await this.alertService.toastError('Não foi possível salvar a disciplina.');
      },
    });
  }
}
