import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ResizeService } from './services/resize.service';

@Component ( {
  selector : 'vf-root',
  templateUrl : './app.component.html',
  styleUrls : [ './app.component.scss' ]
} )
export class AppComponent implements AfterViewInit {

  constructor ( private resizeService: ResizeService) {
  }


  ngAfterViewInit (): void {
    this.onResize();
  }

  public onResize(): void {
    this.resizeService.resize();
  }
}
