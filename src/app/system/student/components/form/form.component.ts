import {Component, OnInit} from '@angular/core';
import {DisciplineService} from '../../../services/discipline.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  id: string | null = null;
  selectedDisciplines: Array<any> = [];

  constructor(
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initForm();
    this.loadDisciplines();
    if (this.id) {
      this.feedForm();
    }

  }

  onSubmit() {
    if (this.id) {
      this.submitUpdate();
    } else {
      this.submitCreate();
    }
  }

  onSelectDiscipline($event: any) {
    const selectedItemId:string = $event.value;
    let selectedItem:any;
    for (const discipline of this.disciplines) {
        if (discipline.value === selectedItemId) {
          selectedItem = discipline;
          this.disciplines.splice(this.disciplines.indexOf(selectedItem), 1);
        }
    }
    this.selectedDisciplines.push(selectedItem);
    this.form.patchValue({
      selectedDiscipline: ''
    })
  }

  removeSelected(discipline:any) {
    for (const selection of this.selectedDisciplines) {
      if (selection.value === discipline.value) {
        this.selectedDisciplines.splice(this.selectedDisciplines.indexOf(selection), 1);
      }
      this.disciplines.push(discipline);
    }
  }


  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      selectedDiscipline: [''],
    });
  }

  private feedForm() {
    if (this.id) {
      this.userService.findById(this.id).subscribe({
        next: async (student: any) => {
          this.form.patchValue({
            name: student.name,
            cpf: student.cpf,
            email: student.email,
            birthday: student.birthday
          });
          if (student.disciplines && student.disciplines.length) {
            for (let storageDiscipline of student.disciplines) {
              this.selectedDisciplines.push({
                value: storageDiscipline.id,
                label: storageDiscipline.name,
              });

              for (const discipline of this.disciplines) {
                  if (discipline.value === storageDiscipline.id) {
                    this.disciplines.splice(this.disciplines.indexOf(discipline), 1);
                  }
              }
            }
          }
        }
      });
    }
  }

  private loadDisciplines() {
    this.disciplineService.getAll().subscribe({
      next: (data: any) => {
        for (const discipline of data) {
          this.disciplines.push({
            value: discipline.id,
            label: discipline.name
          });
        }
      }
    });
  }

  private submitCreate() {
    let formData = this.form.value;
    formData.disciplines = this.selectedDisciplines;
    this.userService.register(formData).subscribe({
      next: async (data: any) => {
        await this.alertService.toastSuccess('Usuário cadastrado com sucesso!');
        await this.router.navigate(['system/students/list']);
      },
      error: async (error) => {
        await this.alertService.toastError('Não foi possível registar o usuário.');
      }
    });
  }

  private submitUpdate() {
    if (this.id) {
      this.userService.updateStudent(this.id, this.form.value).subscribe({
        next: async (data: any) => {
          await this.alertService.toastSuccess('Aluno atualizado com exito');
          await this.router.navigate(['system/students/list']);
        },
        error: async (error) => {
          await this.alertService.toastError('Não fi possível atualizar o cadastro');
        }
      });
    }
  }

}
