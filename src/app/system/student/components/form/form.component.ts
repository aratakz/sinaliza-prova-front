import {Component, OnInit} from '@angular/core';
import {DisciplineService} from '../../../services/discipline.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent  implements OnInit {
  disciplines: Array<any> = []
  // @ts-ignore
  form: FormGroup;
  id: string|undefined;

  constructor(
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required]
    });

    this.disciplineService.getAll().subscribe({
      next: (data:any)  => {
        for (const discipline of data) {
          this.disciplines.push({
            value: discipline.id,
            label: discipline.name
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.id) {

    } else {
      this.userService.register(this.form.value).subscribe({
        next: async (data: any) => {
          await this.alertService.toastSuccess('Usuário cadastrado com sucesso!');
        },
        error: async (error) => {
          await this.alertService.toastError('Não foi possível registar o usuário.');
        }
      });
    }
  }

}
