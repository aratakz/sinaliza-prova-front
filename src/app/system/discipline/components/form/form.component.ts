import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {DisciplineService} from '../../../services/discipline.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  id: string|null = '';

  constructor(
    private globalService: GlobalService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
    });
    if (this.id) {
      this.disciplineService.findOne(this.id).subscribe({
        next: (discipline: any) => {
          this.form.patchValue({
            name: discipline.name,
          })
        }
      })
    }
    this.globalService.activeRouteBehavior.next('Nova disciplina');
  }

  onSubmit() {
    if (this.id) {
      this.update();
    } else {
      this.createNew();
    }
  }

  private update() {
    if (this.id) {
      this.disciplineService.update(this.id, this.form.value).subscribe({
        next: async () => {
          await this.alertService.toastSuccess('Disciplina autalizada com êxito.');
          await this.router.navigate(['../system/discipline/list']);
        },
        error: async () => {
          await this.alertService.toastError('Não foi possível salvar a disciplina.');
        },
      });
    }
  }

  private createNew() {
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
