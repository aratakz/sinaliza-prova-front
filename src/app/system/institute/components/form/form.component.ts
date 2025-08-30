import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstituteService} from '../../../../shared/services/institute.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../auth/services/auth.service';
import {async} from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent  implements OnInit {
  form: FormGroup;
  id: string|null = null;
  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private instituteService: InstituteService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    globalService.actionControlBehavior.next(false);
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  onSubmit() {
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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.instituteService.findById(this.id).subscribe({
        next: (response: any) => {
          this.form.patchValue({
            name: response.name,
          });
        }
      });
    }
  }
}
