import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../system/services/global.service';
import {ExamService} from '../system/services/exam.service';
import {AlertService} from '../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-exam',
  standalone: false,
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit{

  exam: any;
  examId: any;
  activeQuestion: any;
  questions: any;


  constructor(
    private globalService: GlobalService,
    private examService: ExamService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

    ngOnInit(): void {
        this.examId = this.activatedRoute.snapshot.paramMap.get('id');

        this.examService.findOne(this.examId).subscribe({
          next: (exam: any) => {
            this.exam = exam;
            this.questions = exam.questions;
            this.activeQuestion = this.questions[0];
          }
        });
    }

    get activeQuestionTitle() {
        const field = this.activeQuestion.fields
          .filter((field: any) => field.fieldType == 'title');
        if (field) {
          return field[0].fieldValue;
        } else {
          return "";
        }
    }

    get activeQuestionSupportText() {
        const field = this.activeQuestion.fields
          .filter((field: any) => field.fieldType == 'support_data');
        if (field) {
          return field[0].fieldValue;
        } else {
          return "";
        }
    }

}
