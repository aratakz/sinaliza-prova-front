import {
  ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges,
  ViewChild,
  viewChild, ViewRef
} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {BehaviorSubject} from 'rxjs';
import {AlertService} from '../../../services/alert.service';

enum RecoderType {
  record = 'record',
  player = 'player',
}

@Component({
  selector: 'app-record-options-modal',
  standalone: false,
  templateUrl: './record-options-modal.component.html',
  styleUrl: './record-options-modal.component.scss'
})
export class RecordOptionsModalComponent implements OnInit {

  updateVideoBehavior: BehaviorSubject<boolean> = new BehaviorSubject(false);
  videoUrl: string | ArrayBuffer | null | MediaStream = null;
  showVideo: boolean = false
  playing: boolean = false;
  recording: boolean = false;
  videoStream: MediaStream | null | void = null;
  recorder: MediaRecorder| null | void = null;
  autoplay: boolean = false;


  @Input({required: true}) type: any;

  constructor(
    private elementRef: ElementRef,
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
  ) {}
  ngOnInit(): void {
    this.updateVideoBehavior.subscribe({
      next: showVideo => {
        this.showVideo = showVideo;
      }
    })
  }

  onClose() {
    this.modalService.close(this.elementRef);
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
    }
  }

 async onVideoSelect($event:any) {
    this.videoStream = null;
    this.type = {type: RecoderType.player};
    const fileReader = new FileReader();
    fileReader.readAsDataURL($event.target.files[0]);
    fileReader.onloadend = (event) => {
      this.videoUrl = (<FileReader>event.target).result
      this.updateVideoBehavior.next(true);
      this.autoplay = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  async playVideo(videoElement: HTMLVideoElement) {
    if (!this.playing) {
      await videoElement.play();
    } else {
      videoElement.pause();
    }
    this.playing = !this.playing;
    this.changeDetectorRef.detectChanges();
  }

  async openRecorder() {
    this.videoUrl = null;
    this.videoStream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
    }).catch(async (error) => {
      this.videoStream = null;
      if (error == 'NotAllowedError: Permission denied') {
        await this.alertService.toastError('Permissão para câmera negada ');
      } else {
        await this.alertService.toastError('Não foi possível iniciar a câmera');
      }
    });

    if (this.videoStream) {
      this.type = {type: RecoderType.record};
      this.updateVideoBehavior.next(true);
      this.autoplay = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  startStopRecording() {
    this.recording = !this.recording;
    if (this.recording && this.videoStream) {
      this.recorder = new MediaRecorder(this.videoStream, {
        mimeType: 'video/webm',
      })
      this.recorder.ondataavailable = (event) => {
        this.videoStream = null;
        this.type = {type: RecoderType.player};
        this.videoUrl = URL.createObjectURL(event.data);
        this.autoplay = false
        this.changeDetectorRef.detectChanges();
      };
      this.recorder.start();

    } else {
      if (this.recorder) {
        this.recorder.stop();
        this.videoStream= null
      }

    }
    this.changeDetectorRef.detectChanges();

  }
}
