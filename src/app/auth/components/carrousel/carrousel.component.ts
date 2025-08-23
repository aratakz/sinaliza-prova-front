import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carrousel',
  standalone: false,
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent implements OnInit {
  currentImage: undefined|string = undefined;
  currentText:  undefined|string = undefined;

  images= [
    './assets/carrousel_1.jpg',
    './assets/carrousel_2.webp',
    './assets/carrousel_3.jpg',
  ];

  texts = [
    'txto 1',
    'txto 2',
    'txto 3',
  ];

  ngOnInit(): void {
    this.goNext();
    setInterval(() => {
      this.goNext();
    }, 5000);
  }

  goNext(): void {
    if (!this.currentImage) {
      this.currentImage = this.images[0];
      this.currentText = this.texts[0];
    } else {
      const nextImageIndex = (this.images.indexOf(this.currentImage) + 1);
      if (nextImageIndex >= this.images.length) {
          this.currentImage = this.images[0];
          this.currentText = this.texts[0];
      } else {
        this.currentImage = this.images[nextImageIndex];
        this.currentText = this.texts[nextImageIndex];
      }
    }
  }

  goBack(): void {
    if (this.currentImage) {
      const nextImageIndex = (this.images.indexOf(this.currentImage) - 1);
      if (nextImageIndex < 0) {
        this.currentImage = this.images[this.images.length - 1];
        this.currentText = this.texts[this.texts.length - 1];
      } else {
        if (nextImageIndex == 0) {
          this.currentImage = this.images[0];
          this.currentText = this.texts[0];
        } else {
          this.currentImage = this.images[nextImageIndex];
          this.currentText = this.texts[nextImageIndex];
        }
      }
    }
  }
}
