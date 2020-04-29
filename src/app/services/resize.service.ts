import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  public screen: HTMLElement;
  public gameWidth = '0px';
  public $data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  public resize() {
    const game = {
      element: document.getElementById('gameContainer'),
      width: 1000,
      height: 1000,
      safeWidth: 1008,
      safeHeight: 1008
    };
    let viewport, newGameWidth, newGameHeight, newGameX, newGameY;

    // Get the dimensions of the viewport
    viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Determine game size
    if (game.height / game.width > viewport.height / viewport.width) {
      if (game.safeHeight / game.width > viewport.height / viewport.width) {
        // A
        newGameHeight = viewport.height * game.height / game.safeHeight;
        newGameWidth = newGameHeight * game.width / game.height;
      } else {
        // B
        newGameWidth = viewport.width;
        newGameHeight = newGameWidth * game.height / game.width;
      }
    } else {
      if (game.height / game.safeWidth > viewport.height / viewport.width) {
        // C
        newGameHeight = viewport.height;
        newGameWidth = newGameHeight * game.width / game.height;
      } else {
        // D
        newGameWidth = viewport.width * game.width / game.safeWidth;
        newGameHeight = newGameWidth * game.height / game.width;
      }
    }

    game.element.style.width = newGameWidth + 'px';
    game.element.style.height = newGameHeight + 'px';

    newGameX = (viewport.width - newGameWidth) / 2;
    newGameY = (viewport.height - newGameHeight) / 2;

    // Set the new padding of the game so it will be centered
    game.element.style.margin = (newGameY / 2) + 'px ' + newGameX + 'px';
    console.log(game.element);
    game.element.style.background = 'blue';
    this.gameWidth = newGameWidth;
    this.$data.next({newGameWidth});
  }
}
