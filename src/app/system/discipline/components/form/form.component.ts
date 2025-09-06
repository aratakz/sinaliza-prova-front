import {Component, ComponentRef, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {DisciplineService} from '../../../services/discipline.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../../../shared/services/modal.service';
import {CurriculumComponent} from '../modals/curriculum/curriculum.component';
import {CurriculumService} from '../../../services/curriculum.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  // @ts-ignore
  form: FormGroup;
  id: string|null = '';
  curriculumList: Array<any> = [];

  constructor(
    private globalService: GlobalService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private curriculumService: CurriculumService
  ) {}

  ngOnDestroy(): void {
        this.curriculumList = [];
        this._destroy$.next();
  }

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
          });
          if (this.id) {
            this.curriculumList = [];
            if (discipline.curriculums) {
                this.curriculumList = discipline.curriculums;
            }
          }
        }
      });
    }
    this.globalService.activeRouteBehavior.next('Nova disciplina');
    this.curriculumService.curriculumBehavior.pipe(takeUntil(this._destroy$)).subscribe({
      next: (curriculumItem: any) => {
       if (curriculumItem.length) {
         this.curriculumList.push(curriculumItem[0]);
         this.curriculumService.curriculumBehavior.next([]);
       }
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.update();
    } else {
      this.createNew();
    }
  }

  openRegisterModal(template: TemplateRef<any>): void {
    this.modalService.open(template, CurriculumComponent);
  }

  private update() {
    if (this.id) {
      let formValues = this.form.value;
      if(this.curriculumList.length) {
        formValues.curriculum = this.curriculumList;
      }
      this.disciplineService.update(this.id, formValues).subscribe({
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
    let formValues = this.form.value;
    if(this.curriculumList.length) {
      formValues.curriculum = this.curriculumList;
    }
    this.disciplineService.register(formValues).subscribe({
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
