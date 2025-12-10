import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../system/services/global.service';
import {ExamService} from '../system/services/exam.service';
import {AlertService} from '../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../system/services/question.service';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-exam',
  standalone: false,
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
class ExamComponent implements OnInit{

  exam: any;
  examId: any;
  activeQuestion: any;
  questions: any;
  optionList: any;
  answers: Array<any> = [];
  video: any;
  currentQuestion: any = 1;
  responses: any;

  constructor(
    private examService: ExamService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

    ngOnInit(): void {
        this.examId = this.activatedRoute.snapshot.paramMap.get('id');

        this.examService.findOne(this.examId).subscribe({
          next: (exam: any) => {
            this.exam = exam;
            this.questions = exam.questions;
            this.activeQuestion = this.questions[0];
            this.options();

          }
        });
    }
    isAnswered(index: any) {
      const answer = this.answers.filter((answer) => answer.index == index);
      return answer && answer.length > 0;
    }
    respond(activeQuestion:any) {
      const index = this.questions.indexOf(activeQuestion);
      this.answers.push({
        index: index,
        alternative: {}
      });

      this.examService.answer(this.responses).subscribe({
        next: () => {}
      })
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
    get fieldTitleId() {
      const field = this.activeQuestion.fields
        .filter((field: any) => field.fieldType == 'title');
      if (field) {
        return field[0].id;
      } else {
        return "";
      }
    }

    checkAnswer(option: any) {
      const {id} = JSON.parse(<string>this.authService.userData);
      this.responses = {
        option: option.id,
        user: id,
        question: this.activeQuestion.id,
        isAnswer: true
      };
    }

    get fieldSupportId() {
      const field = this.activeQuestion.fields
        .filter((field: any) => field.fieldType == 'support_data');
      if (field) {
        return field[0].id;
      } else {
        return "";
      }
    }
    changeQuestion(index:any) {
      if (!this.isAnswered(index)) {
        this.activeQuestion = this.questions[index];
        this.currentQuestion = index + 1;
        this.video = undefined;
        this.options();
      }

    }
    get activeQuestionSupportText() {
        const field = this.activeQuestion.fields
          .filter((field: any) => field.fieldType == 'support_data');
        if (field && field.length > 0) {
          return field[0].fieldValue;
        } else {
          return "";
        }
    }

    async backToSystem() {
        await this.router.navigate(['system']);
    }

    options() {
        this.examService.getOptions(this.activeQuestion.id).subscribe({
          next: (options: any) => {
            this.optionList   = options;
          }
        });
    }

    playVideo(fieldId: any, isOption= false) {
        if (isOption) {
          this.questionService.getOptionVideo(fieldId).subscribe({
            next: (video: any) => {
              this.video = video.video;
            }
          });
        } else {
          this.questionService.getFieldVideo(fieldId).subscribe({
            next: (video: any) => {
              this.video = video.video;
            }
          });
        }
    }


}

export default ExamComponent
