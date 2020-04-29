import { Component, ElementRef, OnInit } from '@angular/core';
import { ResizeService } from '../services/resize.service';

@Component({
  selector: 'vf-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {
  public el;
  public me = '#1';
  constructor(private elementRef: ElementRef, private resizeService: ResizeService) { }
  public width = 100;
  public height = 100;

  ngOnInit() {
    this.el = this.elementRef.nativeElement;
    this.el.me = this;
    this.el.style.position = 'absolute';

    console.log('gameWidth', this.resizeService.gameWidth);
    // this.el.style.height = 'calc(100%/1000 * 100)';
    //     // this.el.style.width = 'calc(100%/1000 * 100)';

    console.log(this.el);
    console.log(this.el.me);

    this.resizeService.$data.subscribe( data => {
      if (data && data.newGameWidth) {
        this.el.style.left = this.calc(data.newGameWidth, 400);
        this.el.style.top = this.calc(data.newGameWidth, 400);
        this.el.style.height = this.calc(data.newGameWidth, 400);
        this.el.style.width = this.calc(data.newGameWidth, 400);
      } else {
        console.log('it is null still', data);
      }

    });
  }

  private calc(screen, number) {
    return `calc(${screen}px/1000 * ${number})`;
  }
}
