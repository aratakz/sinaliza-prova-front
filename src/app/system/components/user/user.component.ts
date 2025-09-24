import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {UserService} from '../../../auth/services/user.service';
import {FormBuilder, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnDestroy, OnInit {
  imagePath: any;
  user: any;
  gravatarCheckActive: any;
  useGravatar: any;
  usersForm: FormGroup;
  imageData: any;

  constructor(private globalService: GlobalService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {
    this.globalService.activeRouteBehavior.next('Dados Cadastrais');
    this.gravatarCheckActive = '';
    this.useGravatar = false;
    this.usersForm = this.formBuilder.group({
      name: [null],
      birthday: [null],
      email: [null],
      password: [null],
      confirmPassword: [null]
    });
  }

  ngOnInit(): void {
    this.userService.getUseData().subscribe({
      next: (userData: any) => {
        this.user = userData.user;
        this.usersForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          birthday: this.user.birthday
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.globalService.activeRouteBehavior.next('');
  }

  onImageSelect(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      if (fileList.item(0)) {
        const fileReader = new FileReader();
        this.imagePath = URL.createObjectURL(fileList[0]);
        this.userService.avatarSubject.next(this.imagePath);
        fileReader.readAsDataURL(fileList[0]);

        fileReader.onloadend = (event) => {
          this.imageData = (<FileReader>event.target).result
          console.debug(this.imageData);
        }
      }
    }
  }

  changeGravatar() {
    this.useGravatar = !this.useGravatar;
    this.gravatarCheckActive = '';
    this.imagePath = this.user.avatar;
    this.userService.avatarSubject.next(this.imagePath  ||this.user.avatar);
    if (this.useGravatar) {
        if (!this.usersForm.value.email) {
          this.alertService.toastError('forneça um email valido para ultilizar essa função.');
          this.useGravatar = false;
        } else {
          this.gravatarCheckActive = 'checked';
          this.imagePath = `https://www.gravatar.com/avatar/${CryptoJS.MD5(this.usersForm.value.email).toString()}?s=500`;
          this.userService.avatarSubject.next(this.imagePath);
        }
    }
  }

  async onSubmit() {
    const formValue = this.usersForm.value;
    if (this.usersForm.value.birthday) {
      formValue.birthday = this.parseBirthday(this.usersForm.value.birthday);
    }
    formValue.image = this.imageData;
    this.userService.updateUser(formValue).subscribe({
      next: () => {}
    });
    await this.alertService.toastSuccess("Cadastro atualizado com sucesso!");
  }

  private parseBirthday (birthday: string) {
    const split = birthday.split('/');
    return `${split[2]}-${split[1]}-${split[0]}`;
  }
}
