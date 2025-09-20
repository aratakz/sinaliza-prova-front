import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {Router} from '@angular/router';

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
  options: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      support_data: [''],
      options: this.formBuilder.array([])
    });
  }

  async onSubmit() {
    const formValues:any  = this.form.value;
    const images:Array<any>  = [];
    for (const item of this.addedImages) {
      images.push(await this.fileToBase64(item));
    }

    formValues.file = images;


    this.questionService.register(formValues).subscribe({
      next: async () => {
        await this.alertService.toastSuccess('Questão criada com sucesso!');
        // await this.router.navigate(['system/question/list']);
      }
    });
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
    this.galleryList.splice(index, 1);
  }


  addOption() {
    this.options.push({
      track: new Date().toISOString(),
      text: '',
      isAnswer: false
    });
  }

  removeOption(index: any) {
    this.options.splice(index, 1);
  }

  fileToBase64(file: File)  {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Reads the file and returns a data URL (Base64 encoded)
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

}
