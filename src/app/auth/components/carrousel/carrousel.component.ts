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
    './assets/carrousel_1.png',
    './assets/carrousel_2.png',
    './assets/carrousel_3.png',
  ];
  ngOnInit(): void {
    this.goNext();
    setInterval(() => {
      this.goNext();
    }, 10000);
  }

  goNext(): void {
    if (!this.currentImage) {
      this.currentImage = this.images[0];
    } else {
      const nextImageIndex = (this.images.indexOf(this.currentImage) + 1);
      if (nextImageIndex >= this.images.length) {
          this.currentImage = this.images[0];
      } else {
        this.currentImage = this.images[nextImageIndex];
      }
    }
  }
}
