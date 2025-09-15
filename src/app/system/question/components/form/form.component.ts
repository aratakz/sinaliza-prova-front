import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    const formValues:any  = this.form.value;
    const  formData = new FormData();

    for (const addedImage of this.addedImages) {
      formData.append(`image_${new Date().toString()}`, addedImage);
    }

    formValues.files = formData;
    this.questionService.register(formValues).subscribe({
      next: async () => {
        await this.alertService.toastSuccess('Questão criada com sucesso!');
        await this.router.navigate(['system/question/list']);
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
}
