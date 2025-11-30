import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

type galleryItem = {
  id: any;
  link: string | ArrayBuffer | null;
}
@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  galleryList: galleryItem[] = [];


  // @ts-ignore
  form: FormGroup;
  addedImages: Array<File> = [];
  removedImages: Array<string> = [];
  tags: Array<any> = [];
  options: Array<any> = [];
  tagName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  question: any;
  questionId:any;
  tileField: any
  moreField: any
  videos: any = {
    questionTitle: null,
    questionSupport: null
  }

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
                this.form.patchValue({
                  title: field.fieldValue
                });
              }
              if (field.fieldType == 'support_data') {
                this.moreField = field.id;
                console.debug(this.moreField);
                this.form.patchValue({
                    support_data: field.fieldValue
                });
              }
          }
        }

        if (question.images) {
          for (const image of question.images) {
            this.galleryList.push({
              id: image.id,
              link: image.url
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
    const images:Array<any>  = [];
    for (const item of this.addedImages) {
      images.push(await this.fileToBase64(item));
    }
    formValues.file = images;
    formValues.videos = this.videos;

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
    fileReader.readAsDataURL($event.target.files[0]);
    this.addedImages.push($event.target.files[0]);
    fileReader.onloadend = (event) => {
      const imageLink = (<FileReader>event.target).result
      this.galleryList.push({
        id: new Date().toISOString(),
        link: imageLink
      })
    }
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
    this.enableDisableOption();

  }
  removeOption(index: any) {
    this.formAnswers.removeAt(index);
  }
  fileToBase64(file: File)  {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Reads the file and returns a data URL (Base64 encoded)
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  checkAsAnswer(index: any, event: Event) {

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
  inputTag($event: any) {
    console.debug($event.target.value)
    this.tagName = $event.target.value;
  }
  addTag() {
    if (this.tagName !== '') {

      let tagExists = this.tags.filter((tag) => tag.name === this.tagName);
      if (!tagExists.length) {
        this.tags.push({
          id: new Date().toISOString(),
          name: this.tagName
        });
      }
    }

  }
  removeTag(index: any) {
    this.tags.splice(index, 1);
  }

  onAddVideoQuestionTitle($event: string) {
    this.videos.questionTitle = $event;
  }

}

