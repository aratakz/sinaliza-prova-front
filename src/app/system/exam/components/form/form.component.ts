import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisciplineService} from '../../../services/discipline.service';
import {async, lastValueFrom} from 'rxjs';
import {RoomService} from '../../../services/room.service';
import {QuestionService} from '../../../services/question.service';
import {ExamService} from '../../../services/exam.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  disciplines: any = [];
  questions: any = [];
  rooms: any = [];
  selectedQuestions: any = [];

  // @ts-ignore
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private disciplineService: DisciplineService,
    private questionService: QuestionService,
    private roomService: RoomService,
    private examService: ExamService,
    private alertService: AlertService,
    private router: Router
  ) {}

  async ngOnInit() {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      discipline: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', Validators.required],
    })
    const formLists: any = await Promise.all([
      lastValueFrom(this.disciplineService.getAll()),
      lastValueFrom(this.roomService.list()),
    ]);
   let disciplines: Array<any> = [];
   let rooms: Array<any> = [];

   for (const discipline of formLists[0]) {
      disciplines.push({
        value: discipline.id,
        label: discipline.name
      });
   }

   for (const room of formLists[1]) {
      rooms.push({
        value: room.id,
        label: room.name
      });
   }
   this.disciplines = disciplines;
   this.rooms = rooms;
  }

  async onQuestionSearch($event: any) {
    const search = $event.search;
    this.questionService.findByTitle(search).subscribe({
      next: (questions: any) => {
        this.questions = [];
        for (const question of questions) {
          for (const field of question.fields) {
            this.questions.push({ value: question.id, label: field.fieldValue});
          }
        }
      }
    });
  }

  async onSelectQuestion($event: any) {
   const questionId = $event.value;
   this.questionService.findOne(questionId).subscribe({
     next: (question: any) => {
       this.selectedQuestions.push(question);
       this.questions = [];
     }
   });
  }

  removeQuestion(index: any) {
    this.selectedQuestions.splice(index, 1);
  }

  onSubmit(): void {
    let value = this.form.value;
    let qIds = [];
    for (const secQuestion of this.selectedQuestions) {
      qIds.push(secQuestion.id);
    }
    value.questions = qIds;

    this.examService.create(value).subscribe({
      next: async (result: any) => {
        await this.alertService.toastSuccess('Prova criada com sucesso!');
        await this.router.navigate(['system/exam/list']);
      },
      error: async (error) => {
        await this.alertService.toastError('Não foi possível executar a ação');
      }
    });
  }
}
