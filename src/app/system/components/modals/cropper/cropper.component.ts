import {Component, OnInit} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../../../auth/services/user.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cropper',
  standalone: false,
  templateUrl: './cropper.component.html',
  styleUrl: './cropper.component.scss'
})
export class CropperComponent implements OnInit {

  imageChangedEvent:any;
  croppedImage: any;
  cropLink: any;
  cropperWidth: number
  cropperHeight: number

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private   bsModalRef?: BsModalRef
  ) {}

  ngOnInit(): void {}

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImage = event.blob;
      this.cropLink = URL.createObjectURL(event.blob);
    }
  }
  imageLoaded(image: LoadedImage) {
    const width = image.original.image.width;

    this.cropperWidth = width * 0.5
    this.cropperHeight = width * 0.5
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  salvarImagem() {
    this.userService.avatarSubject.next(this.croppedImage);
    this.bsModalRef?.hide()
  }
}
