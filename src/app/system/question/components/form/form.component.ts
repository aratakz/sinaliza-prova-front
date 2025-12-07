import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

type galleryItem = {
  id: any;
  link: string;
}
@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  galleryList: galleryItem[] = [];
  form: FormGroup;
  blobImages: Array<any> = [];
  removedImages: Array<string> = [];
  options: Array<any> = [];
  answerClasses = ['option-item'];

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  question: any;
  questionId:any;
  tileField: any;
  supportField: any;
  tileFieldMedia: any;
  supportFieldMedia: any;
  moreField: any;
  videos: any = {
    questionTitle: null,
    questionSupport: null
  };
  default_support: any;
  optionsMovies:any = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      support_data: [''],
      answers: this.formBuilder.array([])
    });
    this.questionId = this.activatedRoute.snapshot.paramMap.get('id')

    if (this.questionId) {
      this.questionService.findOne(this.questionId).subscribe((question: any) => {
        this.question = question;
        this.form.patchValue({
          name: question.name
        });

        if (question.fields) {
          for (const field of question.fields) {
              if (field.fieldType == 'title') {
                this.tileField = field.id;
                if (field.media) {
                  this.videos.questionTitle = field.media.id;
                  this.tileFieldMedia = field.media.link;
                }
                this.form.patchValue({
                  title: field.fieldValue
                });
              }
              if (field.fieldType == 'support_data') {
                this.moreField = field.id;
                this.supportField = field.id;
                if (field.media) {

                  this.videos.questionSupport = field.media.id;
                  this.supportFieldMedia = field.media.link;
                }
                this.form.patchValue({
                    support_data: field.fieldValue
                });
                this.default_support = field.fieldValue;
              }
          }
        }

        if (question.media) {
          for (const image of question.media) {
            this.galleryList.push({
              id: image.id,
              link: image.link
            });
          }
        }
        if (question.options) {
          for (const option of question.options) {
            this.loadOption(option.title, option.isAnswer);
          }
        }
      });
    }
  }
  async onSubmit() {
    const formValues:any  = this.form.value;
    const storedImages : any = [];
    if (this.blobImages && this.blobImages.length) {
      for (let image of this.blobImages) {
        const storedImage = await this.questionService.saveImage(image)
        storedImages.push(storedImage.id);
      }
    }
    formValues.videos = this.videos;
    formValues.file = storedImages;
    if (this.questionId) {
      formValues.removedImages = this.removedImages;
      this.questionService.update(this.questionId, formValues).subscribe({
        next: async () => {
          await this.alertService.toastSuccess('Questão criada com sucesso!');
          await this.router.navigate(['system/question/list']);
        }
      });
    } else {
      this.questionService.register(formValues).subscribe({
        next: async () => {
          await this.alertService.toastSuccess('Questão criada com sucesso!');
          await this.router.navigate(['system/question/list']);
        }
      });
    }
  }
  addImage($event: any) {
    const fileReader = new FileReader();
    const file = $event.target.files[0];
    fileReader.onloadend = (event:any) => {
      if (event.target.result) {
        const blob = new Blob([new Uint8Array(event.target.result)], {type: file.type });
        this.galleryList.push({
          id: new Date().toISOString(),
          link: URL.createObjectURL(blob)
        });
        this.blobImages.push(blob);
      }
    }
    fileReader.readAsArrayBuffer(file);
  }
  removeImage(index: any) {
    this.removedImages.push(this.galleryList[index].id);
    this.galleryList.splice(index, 1);
  }
  addOption() {
    let answers = [];
    for (const item of this.formAnswers.value) {
      answers.push(item);
    }
    this.formAnswers.clear();
    this.formAnswers.push(new FormGroup({
      isAnswer: new FormControl(false),
      title : new FormControl(),
    }));
    for (let answer of answers) {
      this.loadOption(answer.title, answer.isAnswer);
    }
    this.enableDisableOption();

    let unsetOptions: Array<any> = [];
    for (const control of this.formAnswers.controls) {
      if (control.disabled) {
        unsetOptions.push(1);
      }
    }
    if (unsetOptions.length >= this.formAnswers.controls.length) {
      for (const control of this.formAnswers.controls) {
        control.enable();
      }
    }
  }
  enableDisableOption() {
    for (let control of this.formAnswers.controls) {
      control.disable();

      if (control.value.isAnswer) {
        control.enable({onlySelf: true});
      }
    }
  }
  loadOption(title:any,isAnswer:boolean) {
    const formData = new FormGroup({
      isAnswer: new FormControl(),
      title : new FormControl(),
    });
    formData.patchValue({
      title: title,
      isAnswer: isAnswer
    });
    this.formAnswers.push(formData);

  }
  removeOption(index: any) {
    this.formAnswers.removeAt(index);
  }
  checkAsAnswer(index: any, event: Event) {
        for (const answer of this.formAnswers.controls) {
          answer.patchValue({
            isAnswer: false
          });
        }
        this.formAnswers.controls.at(index)?.patchValue({
          isAnswer: true
        });
  }
  setQuestionTitle(index: any, event: Event) {
    if (this.formAnswers.controls[index].value) {
      this.formAnswers.controls[index].patchValue({
        title : (event.target as HTMLInputElement).value
      });
    }
  }
  get formAnswers(): FormArray {
    return this.form.get('answers') as FormArray;
  }
  onAddVideoQuestionTitle($event: string) {
    this.videos.questionTitle = $event;
  }
  onAddVideoSupport($event: string) {
    this.videos.questionSupport = $event;
  }
  onInputText(event: any) {
    this.form.patchValue({
      support_data: [event]
    });
  }

  protected readonly URL = URL;
}

