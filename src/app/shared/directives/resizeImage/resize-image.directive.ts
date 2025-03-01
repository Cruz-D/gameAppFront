import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appResizeImage]'
})
export class ResizeImageDirective implements OnChanges {

  //valores que indican el largo y el ancho de la imagen
  @Input() width!: string;
  @Input() height!: string;

  constructor(private el: ElementRef) {}

  //cuando se cambia el valor de los atributos width y height
  //se actualiza el tamaño de la imagen
  ngOnChanges(changes: SimpleChanges): void {
    //cambiar los valores de height y width para que se ajusten
    //a los valores pasados como argumentos

    if (changes['width']) {
      this.el.nativeElement.style.width = this.width;
    }
    if (changes['height']) {
      this.el.nativeElement.style.height = this.height;
    }
  }
}
