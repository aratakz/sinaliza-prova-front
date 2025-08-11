import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {UserService} from '../../../auth/services/user.service';
import {SafeUrl} from '@angular/platform-browser';

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


  constructor(private globalService: GlobalService,
              private userService: UserService) {
    this.globalService.activeRouteBehavior.next('Dados Cadastrais');
    this.gravatarCheckActive = '';
    this.useGravatar = false
  }

  ngOnInit(): void {
    this.userService.getUseData().subscribe({
      next: (userData: any) => {
        this.user = userData.user;
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
        this.imagePath = URL.createObjectURL(fileList[0])
      }
    }
  }

  changeGravatar() {
    this.useGravatar = !this.useGravatar;
    this.gravatarCheckActive = '';
    if (this.useGravatar) {
        this.gravatarCheckActive = 'checked'
    }
  }
}
