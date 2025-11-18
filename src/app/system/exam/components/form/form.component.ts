import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisciplineService} from '../../../services/discipline.service';
import {lastValueFrom} from 'rxjs';
import {RoomService} from '../../../services/room.service';
import {QuestionService} from '../../../services/question.service';

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
    private roomService: RoomService
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

  }
}
