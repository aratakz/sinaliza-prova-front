import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../services/room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.roomService.findById(this.id).subscribe({
        next: (rom: any) => {
         this.form.patchValue({
           name: rom.name,
         });
        }
      });
    }
  }

  onSubmit() {
    if (this.id) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  onCreate () {
    this.roomService.create(this.form.value).subscribe({
      next: async () => {
       await this.alertService.toastSuccess('Trurma criada com sucesso!');
       await this.router.navigate(['/system/room']);
      },
      error: async (error) => {
        await this.alertService.toastError('Não foi possível criar o usuário');
      } ,
    });
  }

  onUpdate () {
    this.roomService.update(this.id, this.form.value).subscribe({
      next: async () => {
        await this.alertService.toastSuccess('Turma atualizada com sucesso!');
        await this.router.navigate(['/system/room']);
      },
      error: async (error: any) => {
        await this.alertService.toastError('Não fio possível atualizar a turma');
      }
    })
  }

}
