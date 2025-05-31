import { Component } from '@angular/core';
import { ResizeImageDirective } from '../../../shared/directives/resizeImage/resize-image.directive';

@Component({
  selector: 'app-details',
  imports: [ResizeImageDirective],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

}
