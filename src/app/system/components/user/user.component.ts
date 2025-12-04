import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {UserService} from '../../../auth/services/user.service';
import {FormBuilder, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AlertService } from '../../../shared/services/alert.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {CropperComponent} from '../modals/cropper/cropper.component';

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

  bsModalRef?: BsModalRef;


  constructor(
    private globalService: GlobalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private bsModalService: BsModalService,
    ) {
    this.globalService.activeRouteBehavior.next('Dados Cadastrais');
    this.gravatarCheckActive = '';
    this.useGravatar = false;
    this.usersForm = this.formBuilder.group({
      name: [null],
      birthday: [null],
      email: [null],
      login: [null],
      password: [null],
      confirmPassword: [null]
    });
  }

  ngOnInit(): void {
    this.userService.getUseData().subscribe({
      next: (userData: any) => {
        this.user = userData.user;
        if (this.user.avatar) {
            this.userService.getAvatar(this.user.avatar).subscribe({
              next: (avatar: any) => {
                this.user.avatar = avatar;
                this.userService.avatarSubject.next(avatar);
              }
            })
        }
        this.usersForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          birthday: this.user.birthday
        });
        this.userService.avatarSubject.subscribe({
          next: (avatar: any) => {
            if (avatar) {
              this.imagePath = avatar;
            } else {
              this.imagePath = 'assets/user.png';
            }
            this.imageData = avatar;
          }
        });
      }
    });

  }
  ngOnDestroy(): void {
    this.globalService.activeRouteBehavior.next('');
  }
  onImageSelect(event: any) {
    const initialState: ModalOptions = {
      class: 'modal-xl',
    };

    this.bsModalRef = this.bsModalService.show(CropperComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  async onSubmit() {
    const formValue = this.usersForm.value;
    if (this.usersForm.value.birthday) {
      formValue.birthday = this.parseBirthday(this.usersForm.value.birthday);
    }
    if (this.imageData) {
      await this.userService.updateAvatar(this.imageData);
    }
    this.userService.updateUser(formValue).subscribe({
      next: () => this.usersForm.patchValue({
        login: [null],
        password: [null],
        confirmPassword: [null]
      })
    });
    await this.alertService.toastSuccess("Cadastro atualizado com sucesso!");
  }
  private parseBirthday (birthday: string) {
    const split = birthday.split('/');
    return `${split[2]}-${split[1]}-${split[0]}`;
  }
}
