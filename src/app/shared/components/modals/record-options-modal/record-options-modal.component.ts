import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild,
  viewChild, ViewRef
} from '@angular/core';
import {ModalService} from '../../../services/modal.service';
import {BehaviorSubject} from 'rxjs';
import {AlertService} from '../../../services/alert.service';
import {QuestionService} from '../../../../system/services/question.service';

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
  recorder: MediaRecorder | null | void = null;
  autoplay: boolean = false;


  @Input({required: true}) type: any;
  @Input({required: true}) fieldId: any;
  @Input({required: false}) media: any;
  @Output() submit = new EventEmitter<string>()
  @ViewChild("vContainer") videoContainer!: ElementRef;
  blobStream: any;
  videoProgress = 0;
  currentProgress = "00:00:00";
  fullTimeString = "00:00:00";

  constructor(
    private elementRef: ElementRef,
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
    private questionService: QuestionService
  ) {
  }

  ngOnInit(): void {
    this.updateVideoBehavior.subscribe({
      next: showVideo => {
        this.showVideo = showVideo;
      }
    });

    if (this.media.media) {
      this.videoStream = null;
      this.videoUrl = this.media.media;
      this.type = {type: RecoderType.player};
      this.updateVideoBehavior.next(true)
    } else {
      this.videoUrl = null;
      this.blobStream = undefined;
    }
  }
  onClose() {
    this.stopRecording();
    this.modalService.close(this.elementRef);
  }
  stopRecording() {
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
    }
  }
  formatTime(time:any) {
    return time < 10 ? '0' + time : time;
  }
  async onVideoSelect($event: any) {
    this.videoStream = null;
    this.type = {type: RecoderType.player};
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer($event.target.files[0]);
    fileReader.onloadend = (event) => {
      const buffer = (<FileReader>event.target).result;
      if (buffer instanceof ArrayBuffer) {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        this.blobStream = blob;
        this.videoUrl = URL.createObjectURL(blob);
        this.updateVideoBehavior.next(true);
        this.autoplay = false;
      }
      this.changeDetectorRef.detectChanges();
    }
  }
  currentTime(video: any) {
    const totalSeconds = Math.floor(video.currentTime);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }
  fullTime(video: any) {
    const totalSeconds = Math.floor(video.duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }
  async playVideo(videoElement: HTMLVideoElement) {
    if (!this.playing) {
      videoElement.ontimeupdate  = (event) => {

        let percentage =   (videoElement.currentTime / videoElement.duration) * 100;
        this.videoProgress = Number.parseFloat(percentage.toFixed(2));
        this.currentProgress = this.currentTime(videoElement);
        this.fullTimeString = this.fullTime(videoElement);

        this.changeDetectorRef.detectChanges();

        if (percentage == 100) {
          this.playing = false;
          videoElement.pause();
          this.changeDetectorRef.detectChanges();
        }
      }
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
        this.videoStream = null
      }

    }
    this.changeDetectorRef.detectChanges();

  }
  async onAprove() {
    const result = await this.questionService.saveFieldVideo({
      video: this.blobStream,
      fieldId: this.fieldId.fieldId
    }).catch(() => this.alertService.toastError('Não foi possível enviar o vídeo'));
    if (result) {
      const {media} = await result.json();
      this.submit.emit(media);
      this.onClose();
    }
  }
  removeVideo() {
      this.questionService.removeMedia(this.media.media, this.fieldId.fieldId).subscribe({
        next: () => {
          this.media = undefined;
          this.fieldId = undefined;
          this.videoStream = null;
          location.reload()
        }
      });
  }
}
