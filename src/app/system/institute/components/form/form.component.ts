import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstituteService} from '../../../../shared/services/institute.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../auth/services/auth.service';
import {async} from 'rxjs';
import {CrudService} from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent  implements OnInit, OnDestroy {
  form: FormGroup;
  id: string|null = null;
  subscriptionName: string|null = null;
  subscriptionAmount: string|null = null;
  showDetails = false;
  opened = '';

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private instituteService: InstituteService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private crudService: CrudService
  ) {
    globalService.actionControlBehavior.next(false);
  }


  async createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.globalService.activeRouteBehavior.next('Instituição');

    await this.createForm();
    if (this.id) {
      await this.load();
    }
  }

  async feedForm(values:any) {
    this.form.patchValue({
      name: values.name,
    });
    this.subscriptionName= values.subscriptions.name;
    this.subscriptionAmount = values.subscriptions.totalStorage;
  }

  async load() {
    const institute: any =
      await this.crudService.find.findInstituteById(this.id);
    await this.feedForm(institute);
  }
  async onSubmit() {
    if (this.id) {
      this.instituteService.update(this.id, this.form.value).subscribe({
        next: async () => {
          await this.alertService.toastSuccess('Cadastro atualizado com sucesso!');
          await this.router.navigate(['../system/institute/list']);
        },
        error: async (err) => {
          await this.alertService.toastError('Não foi possível atualziar a instituição');
        }
      });
    } else {
      this.instituteService.register(this.form.value).subscribe({
        next: async response => {
          await this.alertService.toastSuccess('Cadastro realizado com sucesso!');
          await this.router.navigate(['../system/institute/list']);
        },
        error: async (error) => {
          if (error.status === 401) {
            this.alertService.toastInfo('Sua sessão expirou, realize o login novamente.');
            await this.authService.logout()
          }
        }
      });
    }
  }
  async triggerDetails() {
    this.showDetails = !this.showDetails;

    if (this.showDetails) {
      this.opened = 'opened';
    } else {
      this.opened = '';
    }
  }
  async ngOnDestroy(): Promise<void> {
    this.globalService.activeRouteBehavior.next("Intituições");
  }


}
